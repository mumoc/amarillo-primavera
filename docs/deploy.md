# Deploy — Cloudflare

**Estado: en producción.** `https://amarilloprimavera.com` está en vivo.

## Cómo quedó configurado

- **Hosting:** Cloudflare Workers Builds (Git-integrado vía "Workers & Pages → Connect to Git"), no un proyecto Pages clásico — Cloudflare unificó ambos productos y ese flujo del dashboard crea un Worker.
- **Assets:** `wrangler.jsonc` en la raíz del repo con `assets.directory: "./dist"` y sin entrypoint de servidor, para que Cloudflare sirva `dist/` como archivos estáticos puros (ver la nota del bug de imágenes en `docs/plan-implementacion.md` — sin esto, Astro genera referencias a un endpoint `/_image` que no existe en un build estático).
- **Build:** `npm run build` → `dist/`. Deploy automático en cada push a `main`.
- **Dominio:** `amarilloprimavera.com` conectado como Custom Domain directo al Worker, SSL activo.
- **CMS:** Worker de OAuth (`amarillo-primavera-cms-auth.mumo-crls.workers.dev`) desplegado y conectado — `/admin/` funcional con login por GitHub.

## Si hace falta rehacer algo

- **Redesplegar manualmente** (sin esperar el push): `npx wrangler deploy` desde la raíz del repo (usa `wrangler.jsonc`).
- **Reconectar el dominio a otro Worker/proyecto**: dashboard de Cloudflare → el Worker → Settings → Domains & Routes.
- **Rotar credenciales del CMS**: ver la sección correspondiente en `worker/README.md`.

## Pendientes de contenido (no bloquean el sitio)

- **Número de WhatsApp real**: `src/config/site.ts` tiene un placeholder
  (`5210000000000`). Reemplazar con el número real del negocio antes de
  anunciar el sitio.
- **Campo `disponible`**: todos los productos migrados quedaron en
  `disponible: true` por defecto (no había dato de existencia real en el
  catálogo anterior). Ajustar producto por producto vía el CMS, o pedirle a
  Claude que lo haga en lote si se da la lista.
- **Categorías casi duplicadas**: "Coronas y diademas" / "Coronas y diademas
  florales" y "Muñecas" / "Muñecas de trapo" generan páginas de categoría
  separadas. Vale la pena unificarlas como limpieza de contenido.
- **`products/PENDIENTES/`**: la carpeta "creaciones de madera" y las fotos
  sueltas de la raíz siguen sin catalogar, tal como se decidió.
