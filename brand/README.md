---
type: brand
tags: [indice, referencia]
---

# Biblioteca de Marca

Todo lo que define a Amarillo Primavera. Si vas a escribir, diseñar o imprimir
algo de la marca, la respuesta está aquí.

El mapa rápido está en el `CLAUDE.md` de la raíz, que se carga solo en cada
sesión. Este archivo es el índice con detalle.

## Qué falta

**`PENDIENTES.md`** — lista única de lo que hace falta documentar, agrupada por
qué tan urgente es. Es el archivo que hay que abrir primero.

## Identidad

| Archivo | Qué contiene | Cuándo abrirlo |
|---|---|---|
| `PENDIENTES.md` | Lo que falta documentar, priorizado | **Al empezar cualquier trabajo de marca** |
| `about.md` | Inspiración, esencia, dirección comercial | Para entender el "de qué va" la marca |
| `voice.md` | Tono, personalidad, frases guía, qué evitar | **Siempre que escribas texto** |
| `audience.md` | Los tres públicos: turista, clientela local, redes | Antes de decidir el tono de una pieza |
| `sub-brand-tone.md` | Productos que rompen el tono a propósito (ej. Salsa Diabla) | Cuando un producto no encaja en "cálido y nostálgico" |

## Origen y producto

| Archivo | Qué contiene | Cuándo abrirlo |
|---|---|---|
| `historia-fundadora.md` | La historia contada por ella: su papá Ernesto y los jabones de coco, la abuelita, Zamora, aprender sola, y Jesús como promotor. Incluye quién es quién y un banco de frases textuales | Para cualquier texto que tenga que explicar **por qué** existe la marca |
| `proceso-jabones.md` | Qué llevan y qué no los jabones, el proceso, tiempos, pesos, abasto | Para responder preguntas de producto **sin inventar** |
| `equipo-y-roles.md` | Las dos socias, qué hace cada una, cuándo nace la marca (dic 2024) | Antes de hablar de la marca como negocio |
| `lineas-de-producto.md` | Qué líneas existen, cuántos productos tiene cada una y cuáles no están documentadas | Antes de escribir de la marca en general |

Estos dos son los más nuevos y los que más se subutilizan. Casi cualquier texto
de venta mejora si sale de ahí en vez de salir de la imaginación.

## Visual

| Archivo | Qué contiene |
|---|---|
| `colors.md` | Amarillo-oro `#E6A92E` y la paleta completa |
| `logo-guidelines.md` | Versiones del logo y sus usos |
| `photography.md` | Cómo se fotografían los productos |
| `Logo/` | Los archivos: SVG vectorial y PNG a color, transparente y a un color |

## Redes

| Archivo | Qué contiene |
|---|---|
| `hashtags.md` | Hashtags por tipo de producto |

## Impresos

| Carpeta | Qué hay |
|---|---|
| `etiquetas/` | Etiqueta de jabón de 7 × 4.5 cm, 7 variantes |
| `letreros/` | Letrero de beneficios y letrero de historia, para exhibición |

Cada carpeta tiene su propio `README.md`. Los HTML son la fuente; los PDF se
generan con la skill `exportar-impresos` y no se guardan en git.

## Cómo agregar algo a esta biblioteca

1. Archivo `.md` en `brand/` con frontmatter `type: brand` y sus `tags`.
2. Agrégalo a la tabla que le toque en este índice.
3. Si es algo que la IA debe consultar seguido, agrégalo también a la tabla de
   `CLAUDE.md` de la raíz — si no está ahí, en la práctica no se lee.
