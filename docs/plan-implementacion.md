# Plan de Implementación — Sitio Amarillo Primavera

Última actualización: 2026-08-26 — **sitio en vivo en producción.**

## Stack decidido

- **Astro** (Content Collections para productos y, a futuro, blog), `output: "static"`
- **Hosting:** Cloudflare Workers con Static Assets (Workers Builds, integrado con GitHub — deploy automático en push a `main`). Nota: no terminó siendo un proyecto "Pages" clásico sino un Worker con `assets.directory` (ver `wrangler.jsonc` en la raíz) — Cloudflare unificó ambos productos y el flujo "Connect to Git" del dashboard crea un Worker. Funcionalmente es equivalente a lo planeado (deploy automático en push, previews en PRs).
- **Dominio:** `amarilloprimavera.com` — conectado y en vivo
- **Buscador:** Fuse.js en cliente, sobre un JSON generado en build
- **Tags:** filtrado por query param + páginas estáticas por categoría
- **CMS admin (no-técnicos):** Sveltia CMS con OAuth vía Cloudflare Worker
- **Tipografía:** Fraunces (títulos) + Nunito Sans (todo lo demás)
- **A futuro:** skills de Claude Code para mantener productos (tags, descripciones, imágenes) directo en el repo

## Decisiones ya tomadas

| Decisión | Resultado |
|---|---|
| Reescritura de historia de git (purgar `master.key`) | Autorizado |
| `products/creaciones de madera/` + fotos sueltas en raíz | Se mueven a `products/PENDIENTES/`, se catalogan después |
| Precio en el sitio | No se muestra |
| Existencia | Se marca cuál producto está en existencia; **todos** los productos son ordenables (con o sin existencia) |
| Orden de imágenes/productos | Todos los productos son reordenables (ya existía este patrón en el catálogo previo) |
| Tipografía | Fraunces (títulos) + Nunito Sans (resto), Google Fonts autoalojadas |
| CMS | Sveltia CMS (no Decap) |
| Blog | Diferido — no entra en el lanzamiento inicial |
| Orden de lanzamiento | Todo junto: sitio público + CMS se lanzan al mismo tiempo, no por etapas |
| Canal de pedido (CTA de producto) | WhatsApp click-to-chat, mensaje prellenado con el nombre del producto |

## Estado

| Fase | Estado |
|---|---|
| 0 — Higiene del repo | ✅ Completa |
| 1 — Astro + Content Collections | ✅ Completa |
| 2 — Páginas del sitio | ✅ Completa |
| 3 — Tags y filtrado | ✅ Completa |
| 4 — Buscador Fuse.js | ✅ Completa |
| 5 — Blog | Diferida |
| 6 — CMS Sveltia + OAuth Worker | ✅ Completa y activa |
| 7 — Deploy Cloudflare + dominio | ✅ Completa — sitio en vivo |
| 8 — Skills de Claude Code | ✅ Completa |

**Todas las fases del lanzamiento inicial están completas.** Sitio en vivo en
`https://amarilloprimavera.com`: home, catálogo (77 productos), páginas por
categoría, buscador, CTA de WhatsApp, y `/admin/` (Sveltia CMS) con login por
GitHub funcionando vía el Worker de OAuth
(`amarillo-primavera-cms-auth.mumo-crls.workers.dev`).

Solo Fase 5 (blog) queda diferida, como se decidió.

Verificación del 2026-08-26: `main` sincronizado con `origin/main`, árbol
limpio, y el último commit desplegado (los productos eliminados dan 404 en
vivo). El catálogo del repo y el de producción coinciden: 77 productos en
`src/content/products/` y 77 en `/productos-buscar.json`. El build local
genera 93 páginas.

### Bug encontrado y resuelto durante el deploy

El primer deploy conectado vía dashboard sirvió las imágenes rotas: el HTML
generado apuntaba a un endpoint `/_image?href=...` (comportamiento de Astro en
modo SSR) que devolvía 404, en vez de a los `.webp` estáticos que sí genera
`output: "static"`. Causa: al conectar el repo por "Workers & Pages → Connect
to Git", Cloudflare crea un **Worker** (no un proyecto Pages clásico) y, sin
un `wrangler.jsonc` en la raíz, no quedó claro que debía servir `dist/` como
assets estáticos puros. Se agregó `wrangler.jsonc` con
`assets.directory: "./dist"` y sin entrypoint de servidor — eso fuerza el
mismo comportamiento estático verificado en local. Verificado con `wrangler
deploy` manual y confirmado con el redeploy automático subsecuente.

### Toolchain local (resuelto el 2026-08-26)

`npm run dev` y `npm run build` fallaban en local con
`Node.js v20.20.2 is not supported by Astro! Please upgrade to ">=22.12.0"`.
Causa: `mise.toml` fijaba solo `npm`, no Node, así que se usaba el Node 20 del
sistema. Producción nunca se vio afectada porque Cloudflare compila con su
propio Node. Correcciones:

- `mise.toml` ahora fija `node = "22"`. Se quitó el `npm = "latest"`: era un pin
  flotante que arrastraba npm 12, el cual bloquea los install scripts por
  defecto (`esbuild` postinstall) — ahora se usa el npm que trae Node 22.
- `start-dev.command` resuelve Node vía mise y falla con un mensaje claro si la
  versión es menor a 22. Antes, al abrirlo directo desde Finder, bash no cargaba
  `~/.zshrc`, mise no se activaba y tomaba el Node del sistema.
- `Amarillo Primavera.app` apuntaba a una ruta absoluta inexistente
  (`/Users/moshi/projects/amarillo-primavera`); ahora resuelve la raíz del repo
  relativa al bundle.

Verificado: `npm install`, `npm run build` (93 páginas, 77 productos en el
índice), `npm run dev` (home, catálogo y detalle de producto responden 200) y el
doble clic del launcher en un entorno limpio sin mise activado.

### Dependencias (resuelto el 2026-08-26)

`npm audit` reportaba 3 vulnerabilidades (2 altas, 1 moderada) — `js-yaml`,
`nanoid` y `postcss`, todas transitivas de `astro`/`vite` y solo de tiempo de
build. Resueltas con `npm audit fix`: parches menores dentro del lockfile
(`js-yaml` 4.3.0→4.3.1, `postcss` 8.5.20→8.5.26, `nanoid` 3.3.16→3.3.18), sin
cambios en dependencias directas. `npm audit` ahora reporta 0 vulnerabilidades y
el build sigue pasando.

### Pendientes de contenido (no bloquean el sitio, quedan para después)

- ~~**Número de WhatsApp real**~~ — resuelto: `src/config/site.ts` ya tiene el número real.
- ~~**Categorías casi duplicadas**~~ — resuelto: se consolidaron. Hoy quedan 12 categorías, sin "Coronas y diademas" ni "Muñecas de trapo" sueltas.
- **Campo `disponible`**: los 77 productos siguen en `true` (no hay dato real de existencia).
- **`products/PENDIENTES/`**: "creaciones de madera" y fotos sueltas de raíz siguen sin catalogar (34 archivos).
- **`content/published/`**: aún no existe; los 4 borradores de redes siguen en `content/drafts/`.

## Fases

### Fase 0 — Higiene del repo (bloqueante)
- Eliminar `catalog-app/` (Rails abandonado, prácticamente vacío salvo cache/logs/storage)
- Purgar `config/master.key` del historial completo de git (`git filter-repo`)
- Eliminar visores redundantes: `catalogo_server.py`, `catalogo-productos.html`, `lista-productos.html`, `listado-productos.html`
- Sacar `node_modules/` del tracking, agregar `.gitignore` real
- Mover `products/creaciones de madera/` y las fotos sueltas de raíz a `products/PENDIENTES/`

### Fase 1 — Astro + Content Collections
- Scaffold de Astro con adapter de Cloudflare
- Schema Zod de producto: nombre, categoría, tags, tono opcional, imágenes, slug, **disponibilidad** (sin precio)
- Migrar los 120 productos de `products/<slug>/` a `src/content/products/<slug>/` (el catálogo se ha depurado desde entonces; hoy son 77)
- Optimización de imágenes con `astro:assets`
- `products/index.json`, `catalog_report.md`, `categorization_report.md`, `raw/` quedan fuera de `src/` (bitácora/respaldo, no parte del sitio)
- Aplicar tipografía Fraunces + Nunito Sans

### Fase 2 — Páginas del sitio
- Home con identidad de marca (`brand/about.md`, `brand/colors.md`, logo SVG)
- Listado de catálogo (grid)
- Detalle de producto: galería, descripción, tags, categoría, indicador de disponibilidad, botón WhatsApp click-to-chat
- Página "Sobre la marca"

### Fase 3 — Tags y filtrado
- Filtrado por query param sobre el listado (`?tag=...`)
- Páginas estáticas por `categoria` (12 valores en el catálogo actual)

### Fase 4 — Buscador (Fuse.js)
- JSON generado en build (nombre, categoría, tags, descripción)
- Componente de búsqueda en cliente (isla interactiva)

### Fase 5 — Blog (diferida)
- Se retoma después del lanzamiento inicial

### Fase 6 — CMS: Sveltia CMS + OAuth Worker ✅
- Cloudflare Worker para el flujo OAuth con GitHub — desplegado en `amarillo-primavera-cms-auth.mumo-crls.workers.dev`
- `public/admin/config.yml` apuntando al schema de Fase 1 y a la URL real del Worker
- Colección editable de productos: nombre, categoría, tags, descripción, disponibilidad, imágenes con reordenamiento
- GitHub OAuth App creado, credenciales configuradas como Worker secrets (`GITHUB_CLIENT_SECRET`, `AUTH_SECRET`)

### Fase 7 — Deploy (Cloudflare + dominio) ✅
- Repo conectado vía Cloudflare Workers Builds (Git-integrado), deploy automático en `main`
- Dominio `amarilloprimavera.com` conectado directamente al Worker (Custom Domain), con SSL activo
- `wrangler.jsonc` agregado para servir `dist/` como assets estáticos puros (ver bug resuelto arriba)
- Sitio + CMS en vivo juntos, como se decidió

### Fase 8 — Skills de Claude Code
- Migrar lógica de los 5 skills de OpenCode (`agregar-producto`, `editar-producto`, `buscar-productos`, `generar-indice-productos`, `product-page-preview`) a skills de Claude Code
- Adaptar rutas a `src/content/products/`
- Evaluar si `generar-indice-productos` sigue siendo necesario (Astro genera su propio índice en build)

## Dependencias

```
Fase 0 (limpieza)
  └─→ Fase 1 (Astro + Content Collections)
        ├─→ Fase 2 (páginas) ─→ Fase 3 (tags)
        │                    └─→ Fase 4 (búsqueda)
        └─→ Fase 8 (skills Claude)
Fase 1+2 ─→ Fase 6 (CMS) ─→ Fase 7 (deploy)
```

Fase 5 (blog) queda fuera de esta secuencia hasta que se retome.
