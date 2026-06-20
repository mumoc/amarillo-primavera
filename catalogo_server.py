#!/usr/bin/env python3
import html
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent
PRODUCTS_DIR = ROOT / "products"
INDEX_PATH = PRODUCTS_DIR / "index.json"


def frontmatter_value(label, value):
    escaped = str(value).replace('"', '\\"')
    return f'{label}: "{escaped}"'


def build_description_md(product):
    tags = product.get("tags") or []
    tag_lines = "\n".join(f'  - "{tag}"' for tag in tags)
    lines = [
        "---",
        frontmatter_value("nombre", product.get("nombre", "")),
        frontmatter_value("categoria", product.get("categoria", "")),
        "tags:",
        tag_lines,
    ]

    if product.get("tono"):
        lines.append(frontmatter_value("tono", product.get("tono")))

    lines.extend([
        "---",
        "",
        product.get("descripcion", "").strip(),
        "",
    ])
    return "\n".join(lines)


def read_tone_metadata(description_path):
    text = description_path.read_text(encoding="utf-8")
    for line in text.splitlines():
        if line.startswith("tono: "):
            return line.removeprefix("tono: ").strip().strip('"')
    return ""


def get_images(product_dir):
    images_dir = product_dir / "images"
    if not images_dir.exists():
        return []

    files = [path.name for path in images_dir.iterdir() if path.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp", ".gif"]]
    order_file = images_dir / "order.json"

    if order_file.exists():
        try:
            desired_order = json.loads(order_file.read_text(encoding="utf-8"))
            # Filtrar solo archivos que existen
            ordered = [f for f in desired_order if f in files]
            # Agregar archivos nuevos que no están en el orden
            remaining = sorted(set(files) - set(ordered))
            return ordered + remaining
        except Exception:
            pass

    return sorted(files)


def update_image_count(slug, count):
    index = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
    if slug in index:
        index[slug]["num_imagenes"] = count
        INDEX_PATH.write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return index


def build_preview(product, images):
    name = html.escape(product.get("nombre", ""))
    category = html.escape(product.get("categoria", ""))
    description = html.escape(product.get("descripcion", ""))
    main_image = html.escape(f"images/{images[0]}") if images else ""
    thumbnail_items = ""

    if len(images) > 1:
        thumbnail_items = "\n".join(
            f'''<button class="thumbnail {'is-active' if index == 0 else ''}" data-image="images/{html.escape(image)}" type="button">
              <img src="images/{html.escape(image)}" alt="{name}">
            </button>'''
            for index, image in enumerate(images)
        )

    tag_spans = "\n".join(f'<span class="tag">{html.escape(tag)}</span>' for tag in product.get("tags", []))
    gallery = f'''<div class="main-photo">
              <img id="main-image" src="{main_image}" alt="{name}">
            </div>''' if images else '<div class="empty"><p>Este producto no tiene imagenes disponibles.</p></div>'

    return f'''<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{name}</title>
    <style>
      :root {{ color: #28211a; background: #faf7f0; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }}
      body {{ margin: 0; }}
      main {{ max-width: 1080px; margin: 0 auto; padding: 40px 20px; }}
      .product {{ display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 34px; background: #fff; border-radius: 28px; padding: 26px; box-shadow: 0 20px 60px rgba(63, 42, 18, 0.12); }}
      .main-photo {{ overflow: hidden; border-radius: 22px; background: #f3eadb; }}
      .main-photo img {{ display: block; width: 100%; height: min(620px, 70vh); object-fit: contain; }}
      .thumbnails {{ display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }}
      .thumbnail {{ width: 88px; overflow: hidden; aspect-ratio: 1; border: 2px solid #f1dfc4; border-radius: 14px; background: #f3eadb; cursor: pointer; }}
      .thumbnail.is-active {{ border-color: #d89035; }}
      .thumbnail img {{ display: block; width: 100%; height: 100%; object-fit: cover; }}
      .kicker {{ margin: 8px 0 10px; color: #b3732f; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }}
      h1 {{ margin: 0 0 18px; font-family: Georgia, serif; font-size: clamp(34px, 5vw, 54px); line-height: 0.95; }}
      .category {{ display: inline-flex; margin-bottom: 22px; padding: 9px 14px; border-radius: 999px; background: #ffe7b8; color: #7a4512; font-weight: 700; }}
      .description {{ margin: 0 0 24px; color: #5f5143; font-size: 18px; line-height: 1.65; }}
      .tags {{ display: flex; flex-wrap: wrap; gap: 10px; margin: 24px 0 0; }}
      .tag {{ padding: 8px 12px; border: 1px solid #ead8bf; border-radius: 999px; background: #f6efe4; color: #846135; font-size: 14px; font-weight: 650; }}
      .empty {{ min-height: 320px; display: grid; place-items: center; border: 2px dashed #ead8bf; border-radius: 20px; color: #8c6a42; text-align: center; }}
      @media (max-width: 800px) {{ main {{ padding: 18px; }} .product {{ grid-template-columns: 1fr; padding: 18px; }} }}
    </style>
  </head>
  <body>
    <main>
      <section class="product" aria-label="Producto">
        <div>
          {gallery}
          {f'<div class="thumbnails" aria-label="Imagenes del producto">{thumbnail_items}</div>' if len(images) > 1 else ''}
        </div>
        <div>
          <p class="kicker">Amarillo Primavera</p>
          <h1>{name}</h1>
          <div class="category">Categoria: {category}</div>
          <p class="description">{description}</p>
          <div class="tags" aria-label="Hashtags">{tag_spans}</div>
        </div>
      </section>
    </main>
    <script>
      const mainImage = document.querySelector("#main-image");
      document.querySelectorAll(".thumbnail").forEach((thumbnail) => {{
        thumbnail.addEventListener("click", () => {{
          mainImage.src = thumbnail.dataset.image;
          document.querySelectorAll(".thumbnail").forEach((item) => item.classList.remove("is-active"));
          thumbnail.classList.add("is-active");
        }});
      }});
    </script>
  </body>
</html>
'''


class CatalogHandler(SimpleHTTPRequestHandler):
    def do_DELETE(self):
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")

        if len(parts) != 5 or parts[:2] != ["api", "products"] or parts[3] != "images":
            self.send_error(404)
            return

        slug = unquote(parts[2])
        filename = unquote(parts[4])
        product_dir = PRODUCTS_DIR / slug
        images_dir = product_dir / "images"
        image_path = (images_dir / filename).resolve()

        if not product_dir.is_dir() or not images_dir.is_dir():
            self.send_error(404, "Producto no encontrado")
            return

        if image_path.parent != images_dir.resolve() or image_path.suffix.lower() not in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
            self.send_error(400, "Imagen invalida")
            return

        if not image_path.exists():
            self.send_error(404, "Imagen no encontrada")
            return

        try:
            image_path.unlink()
            images = get_images(product_dir)
            update_image_count(slug, len(images))

            response = json.dumps({"ok": True, "num_imagenes": len(images)}, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()
            self.wfile.write(response)
        except Exception as error:
            response = json.dumps({"ok": False, "error": str(error)}, ensure_ascii=False).encode("utf-8")
            self.send_response(400)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()
            self.wfile.write(response)

    def do_POST(self):
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")

        # Endpoint para reordenar imágenes: POST /api/products/<slug>/images/reorder
        if len(parts) == 5 and parts[:2] == ["api", "products"] and parts[3] == "images" and parts[4] == "reorder":
            slug = unquote(parts[2])
            product_dir = PRODUCTS_DIR / slug
            images_dir = product_dir / "images"
            order_file = images_dir / "order.json"

            if not product_dir.is_dir() or not images_dir.is_dir():
                self.send_error(404, "Producto no encontrado")
                return

            try:
                length = int(self.headers.get("Content-Length", "0"))
                payload = json.loads(self.rfile.read(length).decode("utf-8"))
                order = payload.get("order", [])

                if not isinstance(order, list):
                    raise ValueError("El campo 'order' debe ser una lista")

                order_file.write_text(json.dumps(order, ensure_ascii=False, indent=2), encoding="utf-8")

                response = json.dumps({"ok": True}, ensure_ascii=False).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(response)))
                self.end_headers()
                self.wfile.write(response)
            except Exception as error:
                response = json.dumps({"ok": False, "error": str(error)}, ensure_ascii=False).encode("utf-8")
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(response)))
                self.end_headers()
                self.wfile.write(response)
            return

        # Endpoint normal de guardado de producto
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")

        if len(parts) != 3 or parts[:2] != ["api", "products"]:
            self.send_error(404)
            return

        slug = unquote(parts[2])
        product_dir = PRODUCTS_DIR / slug
        description_path = product_dir / "description.md"

        if not product_dir.is_dir() or not description_path.exists():
            self.send_error(404, "Producto no encontrado")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            product = {
                "nombre": str(payload.get("nombre", "")).strip(),
                "categoria": str(payload.get("categoria", "")).strip(),
                "descripcion": str(payload.get("descripcion", "")).strip(),
                "tags": [str(tag).strip() for tag in payload.get("tags", []) if str(tag).strip()],
                "tono": read_tone_metadata(description_path),
            }

            if not product["nombre"] or not product["categoria"]:
                raise ValueError("Nombre y categoria son requeridos")

            description_path.write_text(build_description_md(product), encoding="utf-8")

            index = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
            if slug in index:
                index[slug]["nombre"] = product["nombre"]
                index[slug]["categoria"] = product["categoria"]
                index[slug]["tags"] = product["tags"]
                INDEX_PATH.write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

            preview_path = product_dir / "product-preview.html"
            if preview_path.exists():
                preview_path.write_text(build_preview(product, get_images(product_dir)), encoding="utf-8")

            response = json.dumps({"ok": True, "product": {**index.get(slug, {}), **product}}, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()
            self.wfile.write(response)
        except Exception as error:
            response = json.dumps({"ok": False, "error": str(error)}, ensure_ascii=False).encode("utf-8")
            self.send_response(400)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()
            self.wfile.write(response)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8766), CatalogHandler)
    print("Catalogo editable en http://127.0.0.1:8766/catalogo-productos.html")
    server.serve_forever()
