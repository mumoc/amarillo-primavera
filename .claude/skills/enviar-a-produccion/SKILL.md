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

Si el usuario no ha revisado el cambio en local todavía (`npm run dev` +
`http://localhost:4321`), sugiere que lo haga primero con la skill
`vista-previa-producto`. Si ya dijo explícitamente que le gustó y quiere
publicar, procede directo.

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
4. **Deploy directo (respaldo de seguridad)** — el push a `main` debería
   disparar un deploy automático en Cloudflare, pero esa integración ha
   fallado antes (ver `worker/README.md`). Para garantizar que el sitio
   quede actualizado de inmediato, corre también:
   ```
   npx wrangler deploy
   ```
   desde la raíz del repo (NO desde `worker/` — ese es un proyecto distinto,
   ver más abajo).
5. Confirma al usuario que ya está en vivo y dale el link:
   `https://amarilloprimavera.com`

## Importante: nunca toques el worker del CMS

Este repo tiene **dos** Workers de Cloudflare. El de arriba (paso 4) es el del
sitio (`amarillo-primavera`, usa `wrangler.jsonc` en la raíz). Hay otro
completamente aparte para el login del CMS (`amarillo-primavera-cms-auth`,
vive en `worker/` con su propio `worker/wrangler.toml`) — **nunca** corras
`wrangler deploy` desde dentro de `worker/` como parte de este flujo, y nunca
cambies el `name` del `wrangler.jsonc` de la raíz. Confundir estos dos ya
causó que se sobrescribiera el worker del CMS por accidente más de una vez —
ver la sección de incidentes en `worker/README.md`.

Si algo se ve raro relacionado al CMS (login roto, `/admin/` no funciona)
después de publicar, no lo intentes arreglar solo — avísale al usuario.
