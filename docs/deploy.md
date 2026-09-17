# Deploy — Cloudflare

**Estado: en producción.** `https://amarilloprimavera.com` está en vivo.

## Cómo quedó configurado

- **Hosting:** Cloudflare Workers Builds (Git-integrado vía "Workers & Pages → Connect to Git"), no un proyecto Pages clásico — Cloudflare unificó ambos productos y ese flujo del dashboard crea un Worker.
- **Assets:** `wrangler.jsonc` en la raíz del repo con `assets.directory: "./dist"` y sin entrypoint de servidor, para que Cloudflare sirva `dist/` como archivos estáticos puros (ver el bug de imágenes en `docs/decisiones.md` — sin esto, Astro genera referencias a un endpoint `/_image` que no existe en un build estático).
- **Build:** `npm run build` → `dist/`. Deploy automático en cada push a `main`.
- **Dominio:** `amarilloprimavera.com` conectado como Custom Domain directo al Worker, SSL activo.
- **CMS:** Worker de OAuth (`amarillo-primavera-cms-auth.mumo-crls.workers.dev`) desplegado y conectado — `/admin/` funcional con login por GitHub.

## Buscadores y rendimiento

Revisado el 2026-09-17 con Lighthouse (móvil): SEO 100, rendimiento ~93.

**En el código (ya está):**
- `@astrojs/sitemap` → `/sitemap-index.xml`, referenciado en `public/robots.txt`. `/admin/` va con `Disallow` y `noindex`.
- Canonical, meta description, Open Graph y Twitter en `src/layouts/BaseLayout.astro`. Cada ficha usa el inicio de su descripción real como meta description.
- JSON-LD: `Organization`/`LocalBusiness` en todas las páginas, `Product` en cada ficha (sin `offers`, ver `docs/decisiones.md`).
- `public/_headers`: cache de un año, `immutable`, para `/_astro/*` (los nombres llevan hash).

**Fuera del código (dashboards):**
- [x] Google Search Console (hecho el 2026-09-17): propiedad de **Dominio** para `amarilloprimavera.com`, verificada por TXT en Cloudflare DNS; enviar `https://amarilloprimavera.com/sitemap-index.xml`.
- [ ] Cloudflare → SSL/TLS → Edge Certificates → **Always Use HTTPS** (hoy `http://` responde 200 sin redirigir).
- [ ] `www.amarilloprimavera.com` no tiene registro DNS: agregarlo y redirigirlo al dominio sin `www`.
- Nota: las URLs sin barra final (`/catalogo`) redirigen con 307, que es el comportamiento de Workers Static Assets. Todos los enlaces internos, el canonical y el sitemap ya usan la barra, así que no urge.

## Si hace falta rehacer algo

- **Redesplegar manualmente** (sin esperar el push): `npx wrangler deploy` desde la raíz del repo (usa `wrangler.jsonc`).
- **Reconectar el dominio a otro Worker/proyecto**: dashboard de Cloudflare → el Worker → Settings → Domains & Routes.
- **Rotar credenciales del CMS**: ver la sección correspondiente en `worker/README.md`.
