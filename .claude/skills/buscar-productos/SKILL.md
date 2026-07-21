---
name: buscar-productos
description: Busca o da información sobre productos del catálogo de Amarillo Primavera. Usa cuando el usuario dice "busca productos de #tag", "muestra los de categoría X", "cuántos productos hay", "qué categorías/tags existen", "busca productos con 'palabra'", "muéstrame productos similares a <slug>", o cualquier pregunta general sobre el catálogo.
---

# Buscar Productos

## Fuente de verdad: `productos-buscar.json`

Para cualquier pregunta sobre **qué productos existen** (buscar, listar,
contar, ver categorías o tags disponibles, comparar productos), usa
`productos-buscar.json` como índice — es el generado en cada build a partir
de `src/content/products/`, con id, nombre, categoría, tags y descripción de
todos los productos.

1. Si el sitio no se ha construido recientemente, corre `npm run build` desde
   la raíz del repo primero (regenera el índice con cualquier cambio nuevo).
2. Lee `dist/productos-buscar.json` y filtra/cuenta/agrupa ahí en vez de leer
   archivo por archivo — es mucho más rápido para preguntas generales
   ("¿cuántos jabones hay?", "¿qué categorías existen?", "dame la lista de
   productos con #Navidad").
3. Si necesitas el detalle completo de un producto específico (para
   mostrarlo, editarlo, o revisar sus imágenes), ahí sí ve directo a
   `src/content/products/<slug>/description.md` — el JSON no trae la lista
   de imágenes ni el frontmatter completo (`disponible`, `tono`, etc.).

No uses `products/catalog_report.md`, `products/categorization_report.md` ni
ningún archivo bajo `products/` en la raíz como índice — esos son solo
bitácora histórica de la migración original, no reflejan el catálogo actual.

## Búsquedas puntuales (si no quieres regenerar el build)

Si el usuario solo quiere un producto puntual y no vale la pena rebuildear:

- **Por hashtag**: `grep -l '"#Navidad"' src/content/products/*/description.md`
- **Por categoría**: `grep -l '^categoria: .*Jabones' src/content/products/*/description.md`
- **Por texto libre**: `grep -il '<palabra>' src/content/products/*/description.md`
- **Productos similares a `<slug>`**: lee `src/content/products/<slug>/description.md`, toma su `categoria` y `tags`, y busca otros productos que compartan varios de esos valores.

Para cada resultado, lee el `description.md` completo (frontmatter + cuerpo) antes de mostrarlo, para dar nombre, categoría, tags, disponibilidad y descripción correctos.
