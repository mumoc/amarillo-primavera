---
name: editar-producto
description: Edita un producto existente. Usa cuando el usuario dice: edita el producto, muestra el producto para editar, cambia la descripción de, actualiza el producto.
---

# Editar Producto

Skill para modificar productos existentes del catálogo de Amarillo Primavera.

## Cuándo usar
- Usuario dice "edita el producto <slug>"
- Usuario dice "muestra el producto <slug> para editar"
- Usuario pide cambiar nombre, categoría, descripción o hashtags de un producto

## Flujo de trabajo
1. Lee `products/<slug>/description.md` y muestra el contenido actual
2. Renderiza el preview del producto (reutiliza `product-page-preview`)
3. Recibe la solicitud de cambio en lenguaje natural
4. Propone el texto actualizado
5. **Validación de voz**: compara el cambio propuesto contra `brand/voice.md`
   - Si está alineado → muestra diff y aplica
   - Si se desvía → **advierte y recomienda** una alternativa alineada con la voz (NO bloquea)
   - Usuario puede aceptar, rechazar o forzar el cambio
6. Escribe el `description.md` actualizado
7. Actualiza **solo** la entrada correspondiente en `products/index.json` (no reconstruye todo)
8. Muestra preview actualizado

## Validación de voz (brand/voice.md)
Reglas a verificar:
- Tono cálido, alegre, cercano, nostálgico, mexicano
- Usa frases guía: "Hecho con cariño", "Piezas con alma", "Tradición, color y cuidado"
- Evitar: lenguaje industrial, lujo frío, genérico, sin alma

Si el cambio propuesto viola estas reglas:
- Explicar qué parte se desvía
- Ofrecer una versión corregida que sí respete la voz
- Permitir "forzar" si el usuario insiste (con nota de advertencia)

## Ejemplos de interacción
Usuario: "haz la descripción más corta"
→ Propone versión más breve manteniendo el tono cálido

Usuario: "agrega la categoría 'Navidad'"
→ Actualiza el frontmatter y añade el tag #Navidad si corresponde

Usuario: "hazla sonar más premium"
→ Advierte: "La voz de Amarillo Primavera evita el lujo frío. ¿Quieres una versión más elegante pero manteniendo el calor artesanal?"

## Actualización del índice
Lee `products/index.json`, reemplaza solo la clave del slug editado:
```json
index["<slug>"] = { ...datos actualizados... }
```

## Mensajes al usuario (en español, cálidos)
- "Mostrando el producto actual..."
- "Propuesta de cambio: [diff]"
- "⚠️ Esta redacción se aleja un poco del tono cálido de la marca. Te sugiero: [alternativa]"
- "Cambio aplicado. ¿Quieres ver el preview actualizado?"
