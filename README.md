# amarillo-primavera

Sitio Astro (catálogo de productos artesanales, sin venta directa) + marca +
contenido de redes para Amarillo Primavera.

Ver `docs/plan-implementacion.md` para el plan de fases completo y
`docs/deploy.md` para el proceso de despliegue.

## Estructura

- `src/` — Sitio Astro
  - `content/products/` — Content Collection del catálogo (un folder por producto, con `description.md` + `images/`)
  - `pages/` — Home, `/catalogo/`, `/catalogo/categoria/<slug>/`, `/productos/<slug>/`, `/sobre-la-marca/`
  - `components/`, `layouts/`, `styles/`, `config/`
- `public/admin/` — Sveltia CMS (edición del catálogo sin tocar código)
- `worker/` — Cloudflare Worker de OAuth con GitHub para el CMS
- `brand/` — Identidad de marca (about, voice, colores, logo, audiencia, tono, fotografía, hashtags)
- `products/` — Archivo/respaldo, ya no es el catálogo activo (ver abajo)
- `content/` — Borradores y posts publicados en redes sociales
- `context/` — Contexto externo importado
- `.claude/skills/` — Skills de Claude Code para mantener el catálogo (agregar, editar, buscar, previsualizar, combinar productos, publicar)

## `products/` (archivo, no el catálogo activo)

El catálogo real vive en `src/content/products/`. La carpeta `products/` en la
raíz solo conserva:

- `raw/` — fotos originales sin procesar (nunca tocadas)
- `PENDIENTES/` — fotos sin catalogar aún (línea "creaciones de madera" + fotos sueltas)
- `catalog_report.md`, `categorization_report.md` — bitácora de la categorización original (útil para detectar posibles duplicados, ver skill `combinar-productos`)

El índice de búsqueda del catálogo (`/productos-buscar.json`) se genera solo
en cada build a partir de `src/content/products/` — no hay ningún índice
manual que mantener.

## Desarrollo

```
npm install
npm run dev       # http://localhost:4321
npm run build
```

## Mantener el catálogo con Claude Code

Usa los skills en `.claude/skills/`: "agrega un nuevo producto", "edita el
producto <slug>", "busca productos de #tag", "muéstrame el producto <slug>",
"combina el producto X con el Y", "envíalo a producción".

**Para cualquier pregunta sobre qué productos existen** (buscar, listar,
contar, ver categorías/tags disponibles), usa `/productos-buscar.json` como
fuente — es el índice real, generado en cada build a partir de
`src/content/products/`. Si no existe todavía en `dist/` (no se ha corrido un
build), corre `npm run build` primero y luego léelo desde `dist/productos-buscar.json`.
No uses `products/catalog_report.md` ni ningún archivo viejo como índice — esos
son solo bitácora histórica de la migración, no la fuente de verdad.

## Contenido de redes sociales

1. Borradores en `content/drafts/`
2. Mover a `content/published/<platform>/` cuando estén publicados
