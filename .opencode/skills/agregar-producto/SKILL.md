---
name: agregar-producto
description: Agrega un nuevo producto al catálogo. Usa cuando el usuario dice: agrega un nuevo producto, quiero agregar un producto, nuevo producto, agrega producto con estas fotos.
---

# Agregar Producto

Skill para crear productos nuevos en el catálogo de Amarillo Primavera.

## Cuándo usar
- Usuario menciona "agrega un nuevo producto"
- Usuario dice "quiero agregar un producto" o "nuevo producto"
- Usuario sube fotos + descripción en el chat

## Flujo de trabajo
1. Recibe imágenes y descripción (o "recomiéndame") desde el chat
2. Genera un slug amigable basado en el nombre sugerido
3. Crea la carpeta `products/<slug>/images/`
4. Guarda las imágenes en esa carpeta
5. Genera nombre, categoría, descripción y hashtags usando `brand/voice.md`
6. Escribe `products/<slug>/description.md` con frontmatter YAML
7. Actualiza `products/index.json` agregando la nueva entrada (no reconstruye todo)
8. Llama a `product-page-preview` para mostrar el resultado
9. Pide confirmación antes de finalizar

## Voz de marca
Siempre genera el contenido siguiendo `brand/voice.md`:
- Tono: cálido, alegre, cercano, nostálgico, mexicano
- Usa frases guía: "Hecho con cariño", "Piezas con alma", "Tradición, color y cuidado"
- Evita: lenguaje industrial, lujo frío, genérico

## Estructura del producto creado
```
products/<slug>/
  description.md
  images/
    foto1.jpg
    foto2.jpg
```

## Formato de description.md
```yaml
---
nombre: "Nombre del Producto"
categoria: "Categoría"
tags:
  - "#AmarilloPrimavera"
  - "#HechoAMano"
---
Descripción cálida siguiendo la voz de marca.
```

## Actualización del índice
Lee `products/index.json`, agrega una entrada con la clave = slug:
```json
{
  "<slug>": {
    "slug": "<slug>",
    "nombre": "...",
    "categoria": "...",
    "tags": [...],
    "num_imagenes": N,
    "ruta": "products/<slug>/"
  }
}
```

## Mensajes al usuario (en español, cálidos)
- "¡Perfecto! Creando el producto..."
- "Generando nombre, descripción y hashtags en la voz de Amarillo Primavera..."
- "¡Listo! Producto guardado en products/<slug>/"
- "¿Quieres ver el preview o hacer algún ajuste?"
