# Deploy — Cloudflare

**Estado: en producción.** `https://amarilloprimavera.com` está en vivo.

## Cómo quedó configurado

- **Hosting:** Cloudflare Workers Builds (Git-integrado vía "Workers & Pages → Connect to Git"), no un proyecto Pages clásico — Cloudflare unificó ambos productos y ese flujo del dashboard crea un Worker.
- **Assets:** `wrangler.jsonc` en la raíz del repo con `assets.directory: "./dist"` y sin entrypoint de servidor, para que Cloudflare sirva `dist/` como archivos estáticos puros (ver el bug de imágenes en `docs/decisiones.md` — sin esto, Astro genera referencias a un endpoint `/_image` que no existe en un build estático).
- **Build:** `npm run build` → `dist/`. Deploy automático en cada push a `main`.
- **Dominio:** `amarilloprimavera.com` conectado como Custom Domain directo al Worker, SSL activo.
- **CMS:** Worker de OAuth (`amarillo-primavera-cms-auth.mumo-crls.workers.dev`) desplegado y conectado — `/admin/` funcional con login por GitHub.

## Si hace falta rehacer algo

- **Redesplegar manualmente** (sin esperar el push): `npx wrangler deploy` desde la raíz del repo (usa `wrangler.jsonc`).
- **Reconectar el dominio a otro Worker/proyecto**: dashboard de Cloudflare → el Worker → Settings → Domains & Routes.
- **Rotar credenciales del CMS**: ver la sección correspondiente en `worker/README.md`.
