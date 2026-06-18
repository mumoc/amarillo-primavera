---
name: product-page-preview
description: Use ALWAYS when the user asks to see product details from products/<slug> or the catalog: mostrar, muestrame, ver, quiero ver, renderear, render, preview, visualizar, abrir, detalles del producto, pagina de producto.
---

# Product Page Preview

Use this skill every time the user asks to see, view, render, preview, open, or inspect details for a product in the Amarillo Primavera catalog.

Do not answer with only plain text when the user asks to see a product. Generate or update `product-preview.html` and open it in the OpenWork built-in browser side panel.

Trigger examples:

- "muestrame el producto como pagina"
- "muestrame el producto"
- "muestrame marien nacimiento mini completo"
- "quiero ver este producto"
- "quiero ver los detalles del producto"
- "visualiza este producto"
- "abre el render del producto"
- "abre el producto"
- "renderea el producto"
- "renderiza el producto"
- "muestrame la imagen junto con su descripcion"
- "muestrame su descripcion e imagenes"
- "render de pagina de producto"
- "preview de products/<slug>"

## Product Source

Products live in `products/<slug>/` with this structure:

```text
products/<slug>/
  description.md
  images/
```

Read `description.md` and use its YAML frontmatter:

```yaml
---
nombre: "Product Name"
categoria: "Category"
tags:
  - "#Tag"
---

Description body here.
```

Use all images in `images/`, sorted by filename. The first image is the main image and every image also appears as a thumbnail below it.

## Output File

Create or update this file inside the product folder:

```text
products/<slug>/product-preview.html
```

The preview must be a self-contained HTML file with inline CSS. It should use relative image paths like `images/example.jpg` so it works through the local static server.

## Visual Style

Match Amarillo Primavera:

- Warm, handmade, cheerful, close, and soft.
- Cream and warm yellow backgrounds.
- Rounded product card.
- Large product gallery on the left, product details on the right on desktop.
- Show the first image as the main product image.
- Show all product images as thumbnails below the main image.
- When a thumbnail is clicked, update the main image to that thumbnail.
- Mark the selected thumbnail with an active border.
- Single-column layout on mobile.
- Serif display heading plus clean system sans-serif body text.
- Show `Amarillo Primavera` as a small kicker.
- Show product name, category, description, and hashtags.
- Do not include ecommerce action buttons.
- Do not include "Solicitar por WhatsApp".
- Do not include "Guardar producto".

## HTML Template

Use this structure and replace placeholders:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{nombre}}</title>
    <style>
      :root {
        color: #28211a;
        background: #faf7f0;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      body { margin: 0; }

      main {
        max-width: 1080px;
        margin: 0 auto;
        padding: 40px 20px;
      }

      .product {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 34px;
        background: #fff;
        border-radius: 28px;
        padding: 26px;
        box-shadow: 0 20px 60px rgba(63, 42, 18, 0.12);
      }

      .gallery {
        display: grid;
        gap: 12px;
      }

      .photo {
        display: flex;
        min-height: 420px;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        border-radius: 22px;
        background: #f3eadb;
      }

      .photo img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .thumbnails {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
        gap: 10px;
      }

      .thumbnail {
        overflow: hidden;
        aspect-ratio: 1;
        border: 2px solid #f1dfc4;
        border-radius: 14px;
        background: #f3eadb;
        cursor: pointer;
      }

      .thumbnail.is-active {
        border-color: #d89035;
      }

      .thumbnail img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .kicker {
        margin: 8px 0 10px;
        color: #b3732f;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0 0 18px;
        font-family: Georgia, serif;
        font-size: clamp(34px, 5vw, 54px);
        line-height: 0.95;
      }

      .category {
        display: inline-flex;
        margin-bottom: 22px;
        padding: 9px 14px;
        border-radius: 999px;
        background: #ffe7b8;
        color: #7a4512;
        font-weight: 700;
      }

      .description {
        margin: 0 0 24px;
        color: #5f5143;
        font-size: 18px;
        line-height: 1.65;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 24px 0 0;
      }

      .tag {
        padding: 8px 12px;
        border: 1px solid #ead8bf;
        border-radius: 999px;
        background: #f6efe4;
        color: #846135;
        font-size: 14px;
        font-weight: 650;
      }

      @media (max-width: 800px) {
        main { padding: 18px; }

        .product {
          grid-template-columns: 1fr;
          padding: 18px;
        }

        .photo { min-height: 300px; }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="product" aria-label="Producto">
        <div class="gallery">
          <div class="photo">
            <img id="main-product-image" src="{{main_image_path}}" alt="{{nombre}}">
          </div>
          <div class="thumbnails" aria-label="Imagenes del producto">
            {{thumbnail_items}}
          </div>
        </div>
        <div class="details">
          <p class="kicker">Amarillo Primavera</p>
          <h1>{{nombre}}</h1>
          <div class="category">Categoria: {{categoria}}</div>
          <p class="description">{{descripcion}}</p>
          <div class="tags" aria-label="Hashtags">
            {{tag_spans}}
          </div>
        </div>
      </section>
    </main>
    <script>
      const mainImage = document.querySelector("#main-product-image");
      const thumbnails = document.querySelectorAll(".thumbnail");

      thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {
          const image = thumbnail.querySelector("img");

          mainImage.src = image.src;
          mainImage.alt = image.alt;
          thumbnails.forEach((item) => item.classList.remove("is-active"));
          thumbnail.classList.add("is-active");
        });
      });
    </script>
  </body>
</html>
```

Render each tag as:

```html
<span class="tag">#Tag</span>
```

Render each thumbnail as:

```html
<div class="thumbnail">
  <img src="images/example.jpg" alt="Product Name">
</div>
```

Add `is-active` to the first thumbnail:

```html
<div class="thumbnail is-active">
  <img src="images/example.jpg" alt="Product Name">
</div>
```

If a product has only one image, still render one thumbnail so the layout remains consistent across product previews.

## Opening The Preview

If the user asks to see it, open the preview in the OpenWork built-in browser side panel.

Use a local static server from the repository root when needed:

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765/products/<slug>/product-preview.html
```

If port `8765` is already serving this project, reuse it.
