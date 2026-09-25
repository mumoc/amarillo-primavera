---
type: brand
tags: [redes, instagram, contenido, historico]
---

# Contenido para redes

Posts e historias para Instagram y Facebook. Sirve de **histórico**: qué se
hizo, con qué texto y con qué productos, para reutilizar ideas en vez de
empezar de cero cada temporada.

## Cómo está organizado

Una carpeta por **tema o temporada**, y dentro, cada pieza con dos archivos
que comparten nombre:

```
brand/redes/
  <tema>/
    README.md                 ← ideas del tema y lista de piezas hechas
    <año>-<nombre>.html       ← el diseño (fuente de verdad)
    <año>-<nombre>.md         ← texto del post, hashtags, productos, decisiones
    <año>-<nombre>.png        ← la imagen final (no se guarda en git)
```

- El **año va al inicio** del nombre para que el histórico se ordene solo y no
  se pisen las piezas de un año con las del siguiente.
- El `.md` de cada pieza tiene el texto tal como se publicó (o se va a
  publicar). Si se cambia algo en Instagram después de publicar, actualízalo
  aquí también.
- El `README.md` del tema junta las ideas: lo que funcionó, lo que quedó
  pendiente y lo que se podría hacer la próxima vez.

## Temas

| Carpeta | Qué hay |
|---|---|
| `dia-de-muertos/` | Coronas, diademas y muñecas catrinas |

## Cómo regenerar la imagen

Los PNG **no están en git** (`.gitignore`); el HTML toma las fotos directo del
catálogo (`src/content/products/`), el logo de `brand/Logo/` y las tipografías
del sitio desde `node_modules/` — hace falta haber corrido `npm install`.

Desde la carpeta del tema:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --allow-file-access-from-files --hide-scrollbars --force-device-scale-factor=1 --window-size=1080,1350 --virtual-time-budget=3000 --screenshot=2026-flores-y-catrinas.png "file://$PWD/2026-flores-y-catrinas.html"
```

`--window-size` es el tamaño de la pieza: 1080,1350 para post vertical,
1080,1080 para cuadrado, 1080,1920 para historia.

Si alguna foto del catálogo se renombra o cambia de carpeta (como pasó al
quitar el prefijo `marien-`), el HTML deja de encontrarla: hay que corregir la
ruta en el `<img>`.

## Reglas para los diseños

- **Fotos completas, nunca recortadas.** El marco se hace de la proporción de
  la foto y no al revés; las fotos del catálogo son casi todas verticales. Ver
  `brand/photography.md`.
- **Solo productos que existen** en `src/content/products/`, con su foto real.
- El texto sigue `brand/voice.md`: tuteo, cálido, nada de "estamos a su
  servicio" ni lenguaje de oficina.
- Hashtags de `brand/hashtags.md`.
