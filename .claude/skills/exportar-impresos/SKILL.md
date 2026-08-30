---
name: exportar-impresos
description: Exporta a PDF listo para imprimir el material impreso de la marca (etiquetas de jabón, letreros de canasta). Usa cuando el usuario dice "exporta las etiquetas", "genera el PDF del letrero", "quiero imprimir las etiquetas", "dame esto para la imprenta", o después de editar cualquier HTML dentro de `brand/`.
---

# Exportar Impresos a PDF

Cada impreso de la marca vive como un HTML en `brand/`, y ese HTML es la fuente
de verdad. Los PDF **no** se guardan en el repo (están en `.gitignore`): se
regeneran cuando se necesitan.

Los HTML llevan el logo y las tipografías incrustadas en base64, así que se
exportan igual sin internet y sin el servidor de Astro corriendo.

## Qué hay

| Impreso | Archivo | Qué sale |
|---------|---------|----------|
| Etiquetas de jabón | `brand/etiquetas/etiqueta-jabon.html` | 7 hojas de etiquetas de 7 × 4.5 cm |
| Letrero de canasta | `brand/letreros/letrero-beneficios.html` | Carta vertical + media carta |

Cada carpeta tiene su `README.md` con el detalle de las variantes.

## Exportar

Desde la carpeta del impreso:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=SALIDA.pdf --virtual-time-budget=12000 ENTRADA.html
```

Detalles que importan:

- **Corre el comando desde la carpeta que contiene el HTML.** Chrome resuelve la
  ruta relativa desde ahí; si lo corres desde otro lado exporta una página de
  error sin avisar, y el PDF sale de unos 60 KB en vez de varios MB.
- `--virtual-time-budget=12000` le da tiempo a cargar las tipografías
  incrustadas. Sin él los textos salen con la tipografía de respaldo.
- `--no-pdf-header-footer` quita la fecha y la URL que Chrome mete por default.
- Chrome escribe el número de bytes al terminar. Si no aparece esa línea, la
  exportación falló: revisa el error, no asumas que salió.

## Verificar antes de entregar

Los PDF con fondos de color pesan varios MB porque esas hojas se rasterizan. Es
normal, no es señal de error.

Convierte la primera hoja a imagen y **míra**la:

```bash
sips -s format png --out /tmp/revision.png ARCHIVO.pdf
```

`sips` solo convierte la primera página, y a baja resolución. Para revisar una
hoja específica o un detalle fino, arma un HTML temporal con solo ese elemento y
sácale una captura con `--screenshot` y `--force-device-scale-factor=3`. A baja
resolución las cenefas de flores parecen cortadas aunque estén bien; no lo
corrijas sin verlo primero en alta.

Qué buscar:

- Que las tipografías sean Fraunces y Nunito Sans, no una de respaldo.
- Que sobre los fondos amarillos el logo se vea **fundido** con el fondo, sin
  caja blanca detrás. Eso lo hace `mix-blend-mode: multiply` sobre
  `logo-1color-transparente.png`; si aparece la caja blanca, Chrome no aplicó la
  fusión y el PDF no sirve.
- Que no se corte el nombre "Amarillo Primavera" ni se empalme el texto.

Entrega el PDF al usuario con `SendUserFile`.

## Al imprimir

Recuérdale al usuario que imprima **al 100 % / tamaño real**, sin "ajustar a la
página": si no, las medidas se encogen. Las etiquetas miden 7 × 4.5 cm para
barras de jabón de 8 × 5.5 cm.

Las hojas de fondo amarillo son manchas grandes de tinta; en impresora casera de
inyección suelen salir con bandas. Para esas conviene imprenta digital.

## Cuidado con el flex

Los HTML usan flexbox con alturas fijas en milímetros. Si agregas contenido y
algo se ve aplastado, es que un elemento se encogió: ponle `flex:0 0 auto`. Todo
está en milímetros a propósito, para que lo impreso mida lo que dice.
