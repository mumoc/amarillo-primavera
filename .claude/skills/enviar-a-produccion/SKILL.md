---
name: enviar-a-produccion
description: Publica los cambios pendientes del catálogo al sitio en vivo (amarilloprimavera.com). Usa SOLO cuando el usuario diga explícitamente algo como "envíalo a producción", "publícalo", "ya me gustó, súbelo", "manda esto al sitio". No lo uses proactivamente ni sin esa confirmación explícita.
---

# Enviar a Producción

Publica cambios locales del catálogo (productos agregados, editados,
combinados, etc.) al sitio real. Requiere confirmación explícita del usuario
antes de correr — nunca la dispares tú sola/o sin que te lo pidan con esas
palabras.

## Antes de correr esto

No sugieras revisar en local (`npm run dev`) antes de publicar: Carlos revisa
los cambios directo en amarilloprimavera.com. Su visto bueno al cambio ya
incluye publicarlo.

## Flujo

1. **Build de verificación** — corre `npm run build` desde la raíz del repo.
   Si falla, avisa al usuario y no continúes hasta resolverlo.
2. **Commit** — desde la raíz del repo:
   ```
   git add -A
   git commit -m "<mensaje descriptivo de qué cambió>"
   ```
   El mensaje debe describir el cambio real (ej. "Combina jabón-rosa-01 y
   jabón-rosa-02 en un solo producto", "Actualiza fotos de corona-amarilla").
3. **Push** —
   ```
   git push origin main
   ```
   Si el push es rechazado porque el remoto tiene commits nuevos (alguien más
   editó desde Sveltia mientras tanto), corre `git pull --rebase origin main`
   y vuelve a intentar el push.
   **El push ya es la publicación**: Cloudflare despliega en automático cada
   push a `main`. No corras `npx wrangler deploy` ni pidas `wrangler login`.
4. **Verifica en vivo** — espera un momento y revisa con `curl` la página
   afectada (ej. `https://amarilloprimavera.com/productos/<slug>/`) para
   confirmar que ya muestra el cambio.
5. Confirma al usuario que ya está en vivo y dale el link:
   `https://amarilloprimavera.com`

## Importante: nunca toques el worker del CMS

Este repo tiene **dos** Workers de Cloudflare: el del sitio
(`amarillo-primavera`, usa `wrangler.jsonc` en la raíz) y otro completamente
aparte para el login del CMS (`amarillo-primavera-cms-auth`, vive en
`worker/` con su propio `worker/wrangler.toml`). **Nunca** corras
`wrangler deploy` desde dentro de `worker/` como parte de este flujo, y nunca
cambies el `name` del `wrangler.jsonc` de la raíz. Confundir estos dos ya
causó que se sobrescribiera el worker del CMS por accidente más de una vez —
ver la sección de incidentes en `worker/README.md`.

Si algo se ve raro relacionado al CMS (login roto, `/admin/` no funciona)
después de publicar, no lo intentes arreglar solo — avísale al usuario.
