---
name: buscar-productos
description: Busca productos en el catálogo. Usa cuando el usuario dice: busca productos, muestra los de categoría, busca con el hashtag, encuentra productos de, muéstrame productos similares a.
---

# Buscar Productos

Skill para encontrar productos en el catálogo de Amarillo Primavera usando `products/index.json`.

## Cuándo usar
- Usuario dice "busca productos de #Navidad"
- Usuario dice "muestra todos los de categoría Rag Dolls"
- Usuario dice "busca productos con 'nacimiento' o 'corona'"
- Usuario dice "encuentra algo parecido a <slug>"

## Cómo funciona
Lee `products/index.json` (objeto con slugs como claves) y filtra por:
- `tags` (hashtag exacto o parcial)
- `categoria` (coincidencia exacta o parcial)
- `nombre` (búsqueda de texto)
- `slug` (para "productos similares")

## Tipos de búsqueda soportados
1. **Por hashtag**: "#Navidad", "#HechoAMano"
2. **Por categoría**: "Rag Dolls", "Coronas", "Jabones"
3. **Por texto en nombre**: "nacimiento", "corona", "marien"
4. **Productos similares**: usa la categoría + tags del producto base para sugerir afines

## Resultados
Muestra para cada coincidencia:
- Nombre
- Categoría
- Primeros 3 hashtags
- Número de imágenes
- Miniatura (si existe la primera imagen)

Al seleccionar un resultado, puede llamar a `product-page-preview` para ver detalles completos.

## Modo "inspiración"
Cuando el usuario pide "productos similares a <slug>":
- Lee la entrada del slug base en el índice
- Filtra productos que compartan categoría o al menos 2 tags
- Excluye el producto base
- Muestra 3-6 sugerencias

## Mensajes al usuario (en español, cálidos)
- "Encontré X productos que coinciden..."
- "Mostrando productos de la categoría Rag Dolls..."
- "Aquí tienes opciones similares a Marien Nacimiento Mini..."
- "¿Quieres ver el detalle de alguno?"
