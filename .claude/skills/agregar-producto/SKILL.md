---
name: agregar-producto
description: Agrega un nuevo producto al catálogo de Amarillo Primavera. Usa cuando el usuario dice "agrega un nuevo producto", "quiero agregar un producto", "nuevo producto", o sube fotos + descripción de un producto nuevo.
---

# Agregar Producto

Crea productos nuevos en `src/content/products/`, la Content Collection de Astro que alimenta el catálogo del sitio.

## Flujo de trabajo

1. Recibe imágenes y descripción (o "recomiéndame") desde el chat.
2. Genera un slug amigable en minúsculas con guiones, basado en el nombre del producto (ej. `jabon-brisa-de-mar`). Verifica que no exista ya `src/content/products/<slug>/`.
3. Crea `src/content/products/<slug>/images/` y guarda ahí las imágenes recibidas, con nombres descriptivos en inglés estilo `Categoria_Descripcion_01.jpg` (así se nombran las imágenes existentes en el catálogo).
4. Genera nombre, categoría, descripción y hashtags siguiendo `brand/voice.md` (tono cálido, alegre, nostálgico, cercano) y `brand/hashtags.md` (1–2 hashtags generales de marca + 2–4 de categoría, máx. 8–10 en total). Si el producto pide un tono distinto al por defecto, revisa `brand/sub-brand-tone.md` antes de decidir.
5. Escribe `src/content/products/<slug>/description.md`:

   ```yaml
   ---
   nombre: "Nombre del Producto"
   categoria: "Categoría"
   tags:
     - "#HashtagUno"
     - "#HashtagDos"
   disponible: true
   imagenes:
     - images/Categoria_Descripcion_01.jpg
     - images/Categoria_Descripcion_02.jpg
   ---

   Descripción del producto en tono de marca.
   ```

   - `disponible: true` por defecto salvo que el usuario indique que el producto está agotado/sobre pedido.
   - `imagenes` debe listar exactamente los archivos guardados en el paso 3, en el orden en que deben mostrarse (ese orden es el que ve el usuario final — no hace falta un `order.json` aparte).
   - `tono` (campo opcional) solo si el producto rompe con la voz por defecto — ver `brand/sub-brand-tone.md`.

6. No hace falta actualizar ningún índice a mano: Astro construye el catálogo (`/catalogo/`, búsqueda, páginas por categoría) automáticamente a partir de esta Content Collection en cada build.
7. Sugiere correr `npm run dev` y abrir `/productos/<slug>/` para revisar el resultado (ver skill `vista-previa-producto`).
8. Pide confirmación antes de finalizar.
