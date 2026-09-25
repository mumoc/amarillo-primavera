# amarillo-primavera

Sitio de catálogo (Astro, sin venta directa) y biblioteca de marca de Amarillo
Primavera. En vivo en https://amarilloprimavera.com.

**Si eres un agente (Claude, Codex, etc.), empieza por `AGENTS.md`.**
`CLAUDE.md` es un enlace al mismo archivo.

## Estructura

- `src/` — Sitio Astro
  - `content/products/` — el catálogo: una carpeta por producto, con `description.md` + `images/`
  - `pages/` — Home, `/catalogo/`, `/catalogo/categoria/<slug>/`, `/productos/<slug>/`, `/sobre-la-marca/`
  - `components/`, `layouts/`, `styles/`, `config/`, `lib/`
- `brand/` — biblioteca de marca, la fuente de verdad: voz, historia, equipo, colores, logo, hashtags. Índice en `brand/README.md`, pendientes en `brand/PENDIENTES.md`
- `public/admin/` — Sveltia CMS (editar el catálogo sin tocar código)
- `worker/` — Cloudflare Worker de OAuth con GitHub para el CMS
- `products/` — fotos originales, **no** el catálogo activo:
  - `raw/` — fotos y videos originales que no están en el sitio
  - `PENDIENTES/` — fotos sin catalogar ("creaciones de madera" y fotos sueltas)
- `content/` — lo que se produce con la marca. Índice en `content/README.md`
  - `redes/<tema>/` — posts para Instagram y Facebook, con su texto e histórico
  - `impresos/` — etiquetas y letreros (HTML fuente; los PDF no se guardan)
- `docs/` — `decisiones.md` (por qué el sitio está hecho así) y `deploy.md`
- `.claude/skills/` — skills para mantener el catálogo e imprimir material

Si agregas una foto a `src/content/products/`, no dejes la copia en
`products/raw/`: ahí solo va lo que no está en el sitio.

## Desarrollo

Requiere Node >= 22.12 (`mise install` lo instala desde `mise.toml`).

```
npm install
npm run dev       # http://localhost:4321
npm run build
```

O doble clic en `start-dev.command` desde Finder.

## Mantener el catálogo

Con Claude Code: "agrega un nuevo producto", "edita el producto <slug>",
"busca productos de #tag", "muéstrame el producto <slug>", "combina el producto
X con el Y", "envíalo a producción".

Para saber qué productos existen, la fuente es `/productos-buscar.json`, que se
genera en cada build a partir de `src/content/products/`. Si no hay build, corre
`npm run build` y léelo de `dist/productos-buscar.json`.
