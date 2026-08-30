---
name: exportar-etiquetas
description: Exporta las etiquetas de jabón a un PDF listo para imprimir. Usa cuando el usuario dice "exporta las etiquetas", "genera el PDF de las etiquetas", "quiero imprimir las etiquetas", "dame las etiquetas para la imprenta", o después de editar `brand/etiquetas/etiqueta-jabon.html`.
---

# Exportar Etiquetas a PDF

La fuente de verdad es `brand/etiquetas/etiqueta-jabon.html`. El PDF **no** se
guarda en el repo (está en `.gitignore`): se regenera cuando se necesita.

El HTML lleva el logo y las tipografías incrustadas en base64, así que se
exporta igual sin internet y sin el servidor de Astro corriendo.

## Exportar

```bash
cd brand/etiquetas && "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=etiqueta-jabon.pdf --virtual-time-budget=12000 \
  etiqueta-jabon.html
```

`--virtual-time-budget` le da tiempo a cargar las tipografías incrustadas; sin
él los textos pueden salir con la tipografía de respaldo. `--no-pdf-header-footer`
quita la fecha y la URL que Chrome mete por default en cada hoja.

Chrome escribe el número de bytes al terminar. Si no aparece esa línea, la
exportación falló y hay que revisar el error, no asumir que salió.

## Verificar antes de entregar

El PDF pesa varios MB porque las hojas de fondo amarillo se rasterizan — eso es
normal, no es señal de error.

Revisa la primera hoja convirtiéndola a imagen y mirándola:

```bash
sips -s format png --out /tmp/etiqueta-p1.png brand/etiquetas/etiqueta-jabon.pdf
```

`sips` solo convierte la primera página. Para revisar una variante específica
(por ejemplo las de fondo amarillo), arma un HTML temporal con solo esa etiqueta
y expórtalo aparte.

Qué buscar:

- Que las tipografías sean Fraunces y Nunito Sans, no una de respaldo.
- Que en las variantes de fondo amarillo el logo se vea **fundido** con el
  fondo, sin caja blanca detrás. Eso lo hace `mix-blend-mode: multiply` sobre
  `logo-1color-transparente.png`; si aparece la caja blanca, Chrome no aplicó la
  fusión y el PDF no sirve.
- Que ninguna etiqueta corte el nombre "Amarillo Primavera".

Entrega el PDF al usuario con `SendUserFile`.

## Al imprimir

Recuérdale al usuario que imprima **al 100% / tamaño real**, sin "ajustar a la
página": si no, las etiquetas salen más chicas que el jabón. Las etiquetas miden
7 × 4.5 cm para barras de 8 × 5.5 cm.

Las hojas de fondo amarillo son manchas grandes de tinta; en impresora casera de
inyección suelen salir con bandas. Para esas conviene imprenta digital, o usar
las variantes de fondo crema.

## Si cambian las medidas

En `brand/etiquetas/etiqueta-jabon.html`: `width`/`height` de `.etiqueta` y las
columnas de `.hoja`. Todo está en milímetros a propósito, para que lo impreso
mida lo que dice. Después de cualquier cambio hay que reexportar.
