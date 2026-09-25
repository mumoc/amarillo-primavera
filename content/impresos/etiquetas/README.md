---
type: brand
tags: [etiquetas, impresion, jabon]
---

# Etiquetas de jabón

Etiqueta de **7 × 4.5 cm** para las barras de jabón de 8 × 5.5 cm (deja ~0.5 cm
de jabón visible por lado). Tiene el logo, el pie "Hecho a mano en Colima,
México" y dos renglones en blanco para escribir a mano de qué es el jabón.

## Archivos

- `etiqueta-jabon.html` — fuente editable (logo y tipografías van incrustados,
  funciona sin internet).
- `etiqueta-jabon.pdf` — **no está en el repo**, se genera con la skill
  `exportar-impresos` ("exporta las etiquetas"). Salen 7 hojas tamaño
  carta/A4:
  1. 10 etiquetas, **sobria horizontal** (logo a la izquierda).
  2. 10 etiquetas, **sobria centrada**.
  3. 10 etiquetas, **cenefa florida**: guirnalda de flores arriba y banda
     amarillo-oro abajo.
  4. 10 etiquetas, **guirnalda**: esquinas floreadas y ramillete bajo el logo.
  5. 10 etiquetas, **sol de lado**: fondo amarillo-oro, borde blanco y el logo
     fundido con el fondo.
  6. 10 etiquetas, **bloque partido**: fondo amarillo brillante con el logo
     fundido y una tarjeta blanca para escribir.
  7. 8 etiquetas con el logo a un color (para impresión en blanco y negro).

Las variantes coloridas (3 y 4) usan la paleta emocional de `brand/colors.md`:
rosa mexicano `#D94F70`, verde `#4B7F52`, azul suave `#5B8FA8` y dorado
`#F2CE38`, con el amarillo-oro `#E6A92E` como color principal. Las flores son
SVG dibujado a mano en el propio archivo, así que escalan sin pixelearse.

## Cómo imprimir

Abrir el PDF e imprimir **al 100% / tamaño real** (sin "ajustar a la página"),
si no las medidas salen mal. Papel recomendado: opalina o adhesivo mate.

## Cómo editarla

Editar el HTML y volver a exportar con la skill `exportar-impresos`, que corre:

    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
      --no-pdf-header-footer --print-to-pdf=etiqueta-jabon.pdf \
      --virtual-time-budget=12000 etiqueta-jabon.html

Para cambiar el tamaño de la etiqueta, ajustar `width`/`height` en `.etiqueta`
y las columnas de `.hoja`.

## El logo fundido (hojas 5 y 6)

Las variantes atrevidas usan `logo-1color-transparente.png` con
`mix-blend-mode: multiply` sobre el fondo amarillo. El amarillo del logo se
disuelve en el fondo y solo queda el trazo negro, así que el logo se ve dibujado
sobre la etiqueta en vez de pegado encima. El truco sobrevive la exportación a
PDF: Chrome rasteriza esa capa, no queda caja blanca detrás.

Ojo con estas dos: son manchas grandes de tinta. En impresora casera de
inyección el amarillo puede salir rayado o manchado. Conviene mandarlas a
imprenta digital, o quedarse con las de fondo crema para imprimir en casa.
