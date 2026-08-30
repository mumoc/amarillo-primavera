# Amarillo Primavera

Marca artesanal de Colima, México. Este repo tiene dos cosas: el **sitio de
catálogo** (Astro, en `src/`) y la **biblioteca de marca** (en `brand/`).

El negocio es de la mamá y la esposa del dueño del repo; ellas hacen las piezas.
Él aporta el sitio y el branding.

## Antes de escribir cualquier texto de la marca

Lee `brand/voice.md`. Siempre. La voz es cálida, alegre, cercana, mexicana,
nostálgica — nunca corporativa ni técnica.

## Dónde está cada cosa

| Si necesitas… | Lee |
|---|---|
| Escribir copy, posts, descripciones | `brand/voice.md` |
| Contar de dónde viene la marca, por qué existe | `brand/historia-fundadora.md` |
| Responder qué llevan los jabones, cómo se hacen, cuánto tardan | `brand/proceso-y-materiales.md` |
| Saber a quién le hablas | `brand/audience.md` |
| Colores exactos | `brand/colors.md` |
| Usar el logo | `brand/logo-guidelines.md` |
| Tomar o elegir fotos | `brand/photography.md` |
| Hashtags para redes | `brand/hashtags.md` |
| Un producto con tono distinto al de la marca | `brand/sub-brand-tone.md` |
| La inspiración y esencia general | `brand/about.md` |
| Etiquetas y letreros imprimibles | `brand/etiquetas/`, `brand/letreros/` |

Índice completo con más detalle: `brand/README.md`.

## Reglas que no se rompen

1. **Nunca escribas "100 % natural"** ni equivalentes. Los jabones parten de una
   base de glicerina comercial y la afirmación no se sostiene. Usa la lista de
   lo que **no** llevan: sin espumantes, sin grasa animal, sin endurecedores.
   Ver `brand/proceso-y-materiales.md`.
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
   `brand/proceso-y-materiales.md` o en `src/content/products/`, no existe.

## Skills del proyecto

Están en `.claude/skills/`. Para catálogo: `agregar-producto`,
`editar-producto`, `buscar-productos`, `combinar-productos`,
`agregar-historia-producto`, `vista-previa-producto`, `enviar-a-produccion`.
Para impresos: `exportar-impresos`.

## Impresos

Los HTML en `brand/` son la fuente de verdad; los PDF **no** se guardan en git
(`.gitignore` los excluye) y se regeneran con la skill `exportar-impresos`.
