---
name: generar-indice-productos
description: Reconstruye el índice completo de productos. Usa cuando: el índice está corrupto, se hicieron cambios manuales fuera de los skills, o se necesita regenerar desde cero.
---

# Generar Índice de Productos

Skill helper para reconstruir `products/index.json` desde cero escaneando todos los `description.md`.

## Cuándo usar
- El archivo `products/index.json` no existe o está corrupto
- Se hicieron ediciones manuales directas en los archivos `description.md`
- Se agregaron o eliminaron productos fuera de los skills de agregar/editar
- Se necesita una recuperación completa del índice

## Flujo de trabajo
1. Escanea todas las carpetas en `products/*/`
2. Para cada carpeta que contenga `description.md`:
   - Lee el frontmatter YAML (nombre, categoria, tags)
   - Cuenta las imágenes en `images/`
   - Construye la entrada del índice
3. Escribe `products/index.json` completo (objeto con slugs como claves)
4. Informa cuántos productos se indexaron

## Estructura del índice generado
```json
{
  "<slug>": {
    "slug": "<slug>",
    "nombre": "Nombre del Producto",
    "categoria": "Categoría",
    "tags": ["#Tag1", "#Tag2"],
    "num_imagenes": N,
    "ruta": "products/<slug>/"
  }
}
```

## Notas
- Este skill **reconstruye todo**. Los skills `agregar-producto` y `editar-producto` prefieren actualizaciones parciales (más rápidas).
- Úsalo solo cuando sea necesario regenerar desde cero.
- No requiere interacción del usuario más allá de confirmación inicial.

## Mensajes al usuario
- "Reconstruyendo el índice de productos..."
- "Encontrados X productos. Índice actualizado."
- "¡Listo! products/index.json regenerado."
