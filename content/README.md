---
type: content
tags: [indice, contenido, redes, impresos]
---

# Contenido

Todo lo que **se produce** con la marca: posts para redes, etiquetas,
letreros. Es la salida, no la fuente.

La fuente de verdad de la marca (voz, historia, colores, logo, hashtags,
líneas de producto) está en `brand/`. Si un texto o diseño de aquí contradice
algo de `brand/`, gana `brand/` y se corrige el contenido.

| Carpeta | Qué hay |
|---|---|
| `redes/` | Posts de Instagram y Facebook, por tema, con su texto e ideas. Ver `redes/README.md` |
| `impresos/etiquetas/` | Etiqueta de jabón de 7 × 4.5 cm, 7 variantes |
| `impresos/letreros/` | Letrero de beneficios y letrero de historia, para exhibición |

Cada carpeta tiene su propio `README.md`.

## Qué se guarda en git

Los **HTML y los `.md` son la fuente**; lo que sale de ellos no se guarda
(`.gitignore`):

- Los PDF de impresos se regeneran con la skill `exportar-impresos`.
- Los PNG de redes se regeneran con Chrome headless, ver `redes/README.md`.
