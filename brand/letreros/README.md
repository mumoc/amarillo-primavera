---
type: brand
tags: [letreros, impresion, promocion]
---

# Letreros

Material impreso para exhibir junto a los productos en ferias, tianguis y
puntos de venta.

Son dos y se complementan: `letrero-beneficios` engancha a tres metros,
`letrero-historia` premia a quien se acercó. Conviene llevar los dos.

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

## `letrero-historia.html`

El letrero largo, para poner junto a la canasta y que la gente lo lea de
cerca. Cuenta de dónde vienen los jabones, en primera persona y con las
palabras de quien los hace.

Solo sale en carta vertical: en media carta el texto quedaría demasiado chico
para leerse.

### Qué cuenta

- **El papá.** Hacía jabones de coco rallado, bolas rústicas envueltas en el
  papel de estraza de las tortillas. *«¿Qué hiciste, papá?» «Un jabón para que
  se bañen, de coco.»* No quería jabones comerciales con químicos: quería algo
  natural. De ahí viene todo.
- **La abuelita.** Los cajones que olían a jabón, la ropa que olía bonito. Es
  la cita que abre el letrero, y es la que explica por qué la marca vende
  aromas y no barras.
- **Aprender sola.** Cuarenta años atrás en Zamora, sin internet, con revistas
  españolas y a puro probar. El primer jabón fue de lavanda y fue para ella.
- **Lo que llevan y lo que no**, en dos columnas.
- **El trabajo:** 90 a 100 gramos por barra, doce horas seguidas para un
  pedido de cincuenta.

### Pendiente antes de imprimir

La firma dice `[NOMBRE]` sobre fondo amarillo. **Hay que reemplazarlo por el
nombre real** antes de mandarlo a la imprenta. Está resaltado a propósito para
que no se escape.

## De dónde sale el texto

Todo el contenido de estos letreros sale de `brand/historia-fundadora.md` y
`brand/proceso-y-materiales.md`. Si hay que reescribir algo, empieza por ahí:
las frases textuales de la fundadora están marcadas como citables.

## Sobre el "100 % natural"

El pie de los dos letreros decía "100 % naturales". Se cambió por **"sin
espumantes ni grasa animal"**.

Los jabones parten de una base de glicerina comercial, así que "100 % natural"
es una afirmación que no se sostiene si alguien pregunta. La lista de lo que
*no* llevan es concreta, verificable y convence más que el porcentaje.

## Exportar a PDF

Con la skill `exportar-impresos` ("exporta el letrero"). Los PDF no se guardan
en el repo, se regeneran desde el HTML.

Imprimir al **100 % / tamaño real**, sin "ajustar a la página". La cabecera
amarilla es una mancha grande de tinta: sale mejor en imprenta digital que en
inyección casera.
