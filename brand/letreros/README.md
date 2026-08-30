---
type: brand
tags: [letreros, impresion, promocion]
---

# Letreros

Material impreso para exhibir junto a los productos en ferias, tianguis y
puntos de venta.

## `letrero-beneficios.html`

Letrero para la canasta de jabones. La idea: quien pasa no ve un jabón, ve para
qué le sirve. Cambia "jabón de lavanda" por "el baño de la noche, cuando el día
ya pesó".

Salen dos tamaños del mismo diseño:

1. **Carta vertical** (21.6 × 27.9 cm) — para exhibición, se lee de lejos.
2. **Media carta** (13.9 × 21.6 cm) — para canasta chica; se imprime centrada
   en una hoja carta y se recorta.

### Qué dice

- Encabezado: *No te llevas solo un jabón. / Te llevas cómo te vas a sentir
  después.*
- Tres tarjetas de beneficio con su aroma y el momento en que se usa:
  **relaja** (lavanda y rosas), **refresca** (menta), **suaviza** (bambú).
- Una línea para los que faltan: exfoliantes y aclarantes.
- Cierre: *Pregúntame cuál va contigo* — invita a que la gente se acerque a
  preguntar en vez de solo mirar.
- Pie: 100 % naturales, hechos a mano en Colima, amables con el medio ambiente.

### Notas

Los aromas del letrero (lavanda, menta, bambú, rosas) todavía no existen como
productos en `src/content/products/`. Si alguien los busca en el sitio después
de ver el letrero, no los va a encontrar.

El letrero no promete resultados médicos ni de tratamiento: habla de cómo se
siente el baño. Conviene mantenerlo así — "empareja el tono" en vez de promesas
de aclarado, que son afirmaciones cosméticas reguladas.

## Exportar a PDF

Con la skill `exportar-impresos` ("exporta el letrero"). El PDF no se guarda en
el repo, se regenera desde el HTML.

Imprimir al **100 % / tamaño real**, sin "ajustar a la página". La cabecera
amarilla es una mancha grande de tinta: sale mejor en imprenta digital que en
inyección casera.
