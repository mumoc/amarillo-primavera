# Decisiones técnicas del sitio

Por qué el sitio está hecho como está. El plan de lanzamiento por fases se
completó el 2026-08-26 (sitio en vivo); lo que sigue es lo que conviene saber
antes de cambiar algo. El historial completo del plan está en git.

## Stack

- **Astro** con Content Collections, `output: "static"`.
- **Hosting:** Cloudflare Workers con Static Assets (Workers Builds, deploy
  automático en cada push a `main`). Ver `docs/deploy.md`.
- **Dominio:** `amarilloprimavera.com`.
- **Buscador:** Fuse.js en el cliente, sobre `/productos-buscar.json`, que se
  genera en cada build.
- **Tags:** filtrado por query param (`?tag=...`) + páginas estáticas por
  categoría.
- **CMS:** Sveltia CMS en `/admin/`, con OAuth de GitHub vía el Worker de
  `worker/`.
- **Tipografía:** Fraunces (títulos) + Nunito Sans (resto), autoalojadas.
- **Mantenimiento del catálogo:** skills de Claude Code en `.claude/skills/`.

## Decisiones de producto

| Decisión | Resultado |
|---|---|
| Precio en el sitio | No se muestra |
| Existencia | Se marca cuál está en existencia; **todos** los productos se pueden pedir |
| Orden de imágenes y productos | Reordenables |
| Canal de pedido | WhatsApp click-to-chat, mensaje prellenado con el nombre del producto |
| CMS | Sveltia, no Decap |
| Blog | Diferido |
| Fotos originales (`products/`) | Se quedan en git, pero sin duplicados de lo que ya está en `src/content/products/` |

## Bugs resueltos que pueden volver

### Imágenes rotas en producción

El HTML apuntaba a `/_image?href=...` (comportamiento SSR de Astro), que da 404.
Causa: "Workers & Pages → Connect to Git" crea un **Worker**, no un proyecto
Pages clásico, y sin configuración no sirve `dist/` como estático puro.
Solución: `wrangler.jsonc` en la raíz con `assets.directory: "./dist"` y sin
entrypoint de servidor. **No lo borres.**

### Node en local

Astro 7 requiere Node >= 22.12. `mise.toml` fija `node = "22"` y
`start-dev.command` activa mise explícitamente, porque al abrirlo desde Finder
bash no carga `~/.zshrc`. No fijes `npm = "latest"` en mise: arrastraba npm 12,
que bloquea el postinstall de `esbuild`.

## Pendientes

- **Campo `disponible`**: todos los productos siguen en `true`; no hay dato real
  de existencia.
- **`products/PENDIENTES/`**: "creaciones de madera" y fotos sueltas, sin
  catalogar (34 archivos).
- **Blog**: diferido.

Los pendientes de marca (no del sitio) están en `brand/PENDIENTES.md`.
