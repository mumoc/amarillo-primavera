---
name: buscar-productos
description: Busca productos en el catálogo de Amarillo Primavera. Usa cuando el usuario dice "busca productos de #tag", "muestra los de categoría X", "busca productos con 'palabra'", o "muéstrame productos similares a <slug>".
---

# Buscar Productos

Encuentra productos dentro de `src/content/products/*/description.md` (cada carpeta es un producto, el nombre de la carpeta es el slug).

## Cómo buscar

No hay un índice centralizado que leer — busca directamente sobre los archivos:

- **Por hashtag** (ej. "#Navidad", "#HechoAMano"): `grep -l '"#Navidad"' src/content/products/*/description.md` (ajusta el patrón al tag).
- **Por categoría** (ej. "Muñecas de trapo", "Jabones"): `grep -l '^categoria: .*Jabones' src/content/products/*/description.md`.
- **Por texto libre en nombre o descripción**: `grep -il '<palabra>' src/content/products/*/description.md`.
- **Productos similares a `<slug>`**: lee `src/content/products/<slug>/description.md`, toma su `categoria` y `tags`, y busca otros productos que compartan varios de esos valores.

Para cada resultado, lee el `description.md` completo antes de mostrarlo (frontmatter + cuerpo) para dar nombre, categoría, tags, disponibilidad y descripción correctos.

## Nota

Si el sitio ya corrió un build (`npm run build` o `npm run dev`), también existe `dist/productos-buscar.json` (o el índice en memoria de Fuse.js en `/catalogo/`) con nombre/categoría/tags/descripción de los 120 productos — útil como atajo si ya está generado, pero no confíes en que esté actualizado si hubo cambios recientes sin rebuild; en caso de duda, ve directo a los `description.md`.
