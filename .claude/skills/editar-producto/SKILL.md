---
name: editar-producto
description: Edita un producto existente del catálogo. Usa cuando el usuario dice "edita el producto <slug>", "cambia la descripción de", "marca <producto> como agotado/sobre pedido", "reordena las fotos de", o "actualiza el producto".
---

# Editar Producto

Modifica productos existentes en `src/content/products/<slug>/description.md`.

## Flujo de trabajo

1. Lee `src/content/products/<slug>/description.md` y muestra el contenido actual (frontmatter + descripción).
2. Recibe la solicitud de cambio en lenguaje natural. Puede ser sobre:
   - **Nombre, categoría, tags o descripción**: valida el texto propuesto contra `brand/voice.md` (y `brand/sub-brand-tone.md` si el producto tiene tono especial). Si está alineado, muestra el diff y aplica. Si se desvía del tono de marca, **advierte y recomienda** una alternativa alineada — no bloquea; el usuario puede aceptar, rechazar o forzar el cambio.
   - **Disponibilidad**: cambia el campo `disponible: true/false`. Recuerda que aunque un producto no esté disponible, sigue siendo pedible por WhatsApp desde el sitio (se muestra como "Sobre pedido"), así que este campo es solo informativo de existencia, no bloquea el CTA de pedido.
   - **Orden de imágenes**: reordena la lista `imagenes:` en el frontmatter según lo que pida el usuario — el orden del arreglo es el orden en que se muestran en la galería del producto.
   - **Agregar/quitar fotos**: copia los archivos nuevos a `images/`, actualiza `imagenes:` en el frontmatter. Si se quita una foto, bórrala solo si el usuario lo confirma explícitamente (no borres archivos sin confirmación).
3. Escribe el `description.md` actualizado.
4. No hace falta tocar ningún índice aparte — Astro relee la Content Collection en cada build/dev.
5. Sugiere revisar el resultado con la skill `vista-previa-producto`.
