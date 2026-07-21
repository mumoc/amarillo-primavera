---
name: vista-previa-producto
description: Muestra cómo se ve un producto en el sitio real. Usa cuando el usuario dice "muéstrame el producto", "quiero ver este producto", "abre el producto", "renderiza el producto", o pide ver detalles/imágenes/descripción de un producto del catálogo.
---

# Vista Previa de Producto

El catálogo ahora es un sitio Astro real — no se genera un HTML de vista previa aparte, se usa la página real del sitio.

## Flujo de trabajo

1. Si no hay un servidor corriendo, arranca uno: `npm run dev` (por defecto en `http://localhost:4321`).
2. Abre `http://localhost:4321/productos/<slug>/` — esa es la página real que verá el usuario final, con galería, disponibilidad, tags y el botón de pedido por WhatsApp ya funcionando.
3. Si el usuario pide ver el catálogo completo o una categoría, usa `/catalogo/` o `/catalogo/categoria/<slug-categoria>/` en su lugar.
4. Si Claude tiene acceso a herramientas de navegador (Chrome), navega a la URL y toma una captura para mostrarle el resultado al usuario directamente en la conversación.
