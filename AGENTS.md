# Amarillo Primavera

Marca artesanal de Colima, México. Este repo tiene tres cosas: el **sitio de
catálogo** (Astro, en `src/`), la **biblioteca de marca** (en `brand/`) y el
**contenido** que se produce con ella (en `content/`: posts, etiquetas,
letreros).

**`brand/` es solo la fuente de verdad de la marca**: voz, historia, colores,
logo, hashtags, líneas de producto. Nada que se genere a partir de ella va ahí
— ni posts, ni impresos, ni fotos de producto. Eso va en `content/`, `src/` o
`products/`.

**No es una marca de jabones.** Hace muñecas de trapo (33 productos, la línea
más grande), jabones (15), coronas y diademas florales (15), arreglos, macetas,
llaveros y más. Solo los jabones tienen proceso documentado, así que es fácil
sesgarse hacia ellos al escribir: no lo hagas. Ver
`brand/lineas-de-producto.md`.

El repo es de **Carlos (mumoc)**, que aporta el sitio y el branding. Las piezas
las hacen su mamá y su esposa.

- **María de los Ángeles Moreno Villegas**, su mamá, es la fundadora. Quiere ser
  conocida como **«La Morocha»** — así firma el material de la marca. No uses
  "Tita" en público.
- **Adela**, esposa de Carlos, es **socia fundadora** — no ayudante ni
  encargada de redes. Lleva la venta, las tiendas a consignación y los stands.

Los nombres de la familia y quién es quién están en
`brand/historia-fundadora.md`. Ojo: cuando la fundadora dice «mi papá» habla de
**Ernesto** (el del oficio); **Jesús** es su esposo (el promotor). Es fácil
confundirlos.

## Pendientes

**`brand/PENDIENTES.md` tiene lo que falta documentar.** Revísalo al empezar. Si
el usuario contesta alguna de esas preguntas en la conversación, documéntala en
el archivo que le toca, táchala en PENDIENTES y commitea — no la dejes solo en
el chat.

El hueco más grande: las muñecas son la línea más numerosa del catálogo y no
tienen nada escrito.

## Antes de escribir cualquier texto de la marca

Lee `brand/voice.md`. Siempre. La voz es cálida, alegre, cercana, mexicana,
nostálgica — nunca corporativa ni técnica.

## Dónde está cada cosa

| Si necesitas… | Lee |
|---|---|
| Escribir copy, posts, descripciones | `brand/voice.md` |
| Contar de dónde viene la marca, por qué existe | `brand/historia-fundadora.md` |
| Nombres de la familia, quién es quién | `brand/historia-fundadora.md` |
| Quién hace qué, cómo opera el negocio | `brand/equipo-y-roles.md` |
| Responder qué llevan los jabones, cómo se hacen, cuánto tardan | `brand/proceso-jabones.md` |
| Saber qué líneas de producto existen y cuáles faltan documentar | `brand/lineas-de-producto.md` |
| Saber a quién le hablas | `brand/audience.md` |
| Colores exactos | `brand/colors.md` |
| Usar el logo | `brand/logo-guidelines.md` |
| Tomar o elegir fotos | `brand/photography.md` |
| Hashtags para redes | `brand/hashtags.md` |
| Hacer un post, o ver qué se ha publicado y con qué texto | `content/redes/` |
| Un producto con tono distinto al de la marca | `brand/sub-brand-tone.md` |
| La inspiración y esencia general | `brand/about.md` |
| Etiquetas y letreros imprimibles | `content/impresos/` |
| Saber qué fotos ya están en el sitio y cuáles revisó Carlos | `docs/fotos-del-sitio.md` |
| Cambiar algo técnico del sitio o el deploy | `docs/decisiones.md`, `docs/deploy.md` |

Índice completo con más detalle: `brand/README.md` (marca) y
`content/README.md` (lo producido).

## Reglas que no se rompen

1. **Nunca escribas "100 % natural"** ni equivalentes. Los jabones parten de una
   base de glicerina comercial y la afirmación no se sostiene. Usa la lista de
   lo que **no** llevan: sin espumantes, sin grasa animal, sin endurecedores.
   Ver `brand/proceso-jabones.md`.
2. **No prometas resultados de tratamiento** de piel (acné, alergias,
   aclaramiento). Son afirmaciones cosméticas reguladas. Habla de cómo se siente
   el baño, no de lo que cura.
3. **Prefiere las frases textuales de la fundadora** sobre cualquier redacción
   propia. Están en `brand/historia-fundadora.md`. Suenan a persona real, y eso
   es lo que no puede copiar un jabón de supermercado.
4. **No inventes historia de curado o reposo.** Estos jabones están listos en
   menos de 10 minutos; el argumento es otro (doce horas seguidas para un
   pedido de cincuenta, una barra a la vez).
5. **No inventes aromas, ingredientes ni productos.** Si no está en
   `brand/proceso-jabones.md` o en `src/content/products/`, no existe.
6. **El oficio tiene 40 años; la marca, menos de 2** (nace en diciembre de
   2024). No presentes a Amarillo Primavera como un negocio con trayectoria
   comercial larga. Ver `brand/equipo-y-roles.md`.
7. **No imprimas las cifras de dinero** de la historia familiar (5 000, 10 000
   pesos) sin aclarar la época: son de hace décadas, probablemente en pesos
   viejos. Leídas hoy dan una idea equivocada.

## Skills del proyecto

Están en `.claude/skills/`. Para catálogo: `agregar-producto`,
`editar-producto`, `buscar-productos`, `combinar-productos`,
`agregar-historia-producto`, `vista-previa-producto`, `enviar-a-produccion`.
Para impresos: `exportar-impresos`.

## Contenido producido

Posts e impresos viven en `content/`. Sus HTML y `.md` son la fuente; los PDF y
PNG **no** se guardan en git (`.gitignore` los excluye): los PDF se regeneran
con la skill `exportar-impresos` y los PNG de redes como dice
`content/redes/README.md`.

Cada post nuevo va en `content/redes/<tema>/<año>-<nombre>`, con un `.md` que
guarde el texto publicado, los productos y las decisiones. Es el histórico:
antes de hacer un post, revisa si el tema ya tiene piezas e ideas.
