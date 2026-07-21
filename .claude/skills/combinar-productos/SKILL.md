---
name: combinar-productos
description: Combina dos o más productos del catálogo en uno solo, o limpia fotos repetidas/duplicadas dentro de un producto. Usa cuando el usuario dice "combina el producto X con el Y", "estos dos son el mismo producto", "quita las fotos repetidas de X", "fusiona estas entradas".
---

# Combinar Productos / Limpiar Duplicados

Skill para consolidar productos del catálogo de Amarillo Primavera que quedaron
duplicados o casi-duplicados (mismo producto fotografiado en tandas distintas),
y para limpiar fotos repetidas dentro de un mismo producto.

Nota: `products/catalog_report.md` (bitácora de la migración original) ya
señala varios pares sospechosos de ser duplicados — vale la pena revisarlo si
el usuario pregunta "¿cuáles productos podrían estar duplicados?".

## Flujo para combinar dos productos en uno

1. Lee ambos `src/content/products/<slug-a>/description.md` y
   `src/content/products/<slug-b>/description.md` completos (frontmatter +
   descripción).
2. Muéstraselos al usuario lado a lado y pregunta cuál de los dos nombres,
   categoría y descripción quiere conservar (o si quiere combinar el texto de
   ambas descripciones).
3. Decide el slug final: normalmente el del producto que se conserva. Si
   ninguno es claramente el "principal", pregunta al usuario qué slug prefiere.
4. Copia todas las imágenes de ambas carpetas `images/` a la carpeta del slug
   final, **detectando duplicados exactos** antes de copiar:
   - Compara por contenido (hash), no solo por nombre de archivo — es común
     que la misma foto tenga nombres distintos entre las dos tandas.
   - Si dos imágenes son visualmente el mismo ángulo del producto pero no
     duplicados exactos (ej. la misma foto recortada distinto), pregunta al
     usuario si quiere conservar ambas o solo una — no lo decidas solo.
5. Actualiza el `imagenes:` del `description.md` final con la lista
   consolidada y sin duplicados, en el orden que decida el usuario.
6. Combina `tags` de ambos productos (unión, sin repetir).
7. Borra la carpeta del slug que no se conserva
   (`src/content/products/<slug-descartado>/`) solo después de que el usuario
   confirme — nunca borres sin confirmación explícita.
8. Corre `npm run build` para confirmar que no rompe nada (el slug borrado no
   debe quedar referenciado en ningún lado — revisa que no haya enlaces rotos
   a `/productos/<slug-descartado>/` en otros archivos).

## Flujo para limpiar fotos repetidas dentro de un producto

1. Lee las imágenes en `src/content/products/<slug>/images/`.
2. Compara por contenido (hash de archivo), no solo nombre — detecta
   duplicados exactos.
3. Muestra al usuario cuáles detectaste como duplicadas antes de borrar nada.
4. Tras confirmación, borra los archivos duplicados y actualiza el
   `imagenes:` del `description.md` para que ya no los liste.

## Después de combinar/limpiar

Sugiere usar la skill `vista-previa-producto` para que el usuario revise el
resultado en `npm run dev` antes de mandarlo a producción con la skill
`enviar-a-produccion`.
