# Plan de Implementación — Sitio Amarillo Primavera

Última actualización: 2026-07-20

## Stack decidido

- **Astro** (Content Collections para productos y, a futuro, blog)
- **Hosting:** Cloudflare Pages, integrado con GitHub (deploy automático en push a `main`)
- **Dominio:** `amarilloprimavera.com` (ya comprado en Cloudflare Registrar)
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
- Migrar los 120 productos de `products/<slug>/` a `src/content/products/<slug>/`
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
- Páginas estáticas por `categoria` (12 valores del catálogo actual)

### Fase 4 — Buscador (Fuse.js)
- JSON generado en build (nombre, categoría, tags, descripción)
- Componente de búsqueda en cliente (isla interactiva)

### Fase 5 — Blog (diferida)
- Se retoma después del lanzamiento inicial

### Fase 6 — CMS: Sveltia CMS + OAuth Worker
- Cloudflare Worker para el flujo OAuth con GitHub
- `admin/config.yml` apuntando al schema de Fase 1
- Colección editable de productos: nombre, categoría, tags, descripción, disponibilidad, imágenes con reordenamiento

### Fase 7 — Deploy (Cloudflare Pages + dominio)
- Conectar repo de GitHub a Cloudflare Pages, deploy automático en `main`
- Configurar dominio `amarilloprimavera.com`
- Variables de entorno / secrets del Worker de OAuth
- Lanzamiento de sitio + CMS juntos

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
