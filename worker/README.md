# CMS Auth Worker

Cloudflare Worker que implementa el flujo de OAuth con GitHub para Sveltia CMS
(`/public/admin/`). Implementa el protocolo estándar de Decap/Sveltia CMS:
`/auth` redirige a GitHub, `/callback` intercambia el código por un token y se
lo pasa de vuelta al admin vía `postMessage`.

## Estado: desplegado ✅

- Worker en vivo: `https://amarillo-primavera-cms-auth.mumo-crls.workers.dev`
- GitHub OAuth App creado, `GITHUB_CLIENT_ID` en `wrangler.toml`, secretos
  (`GITHUB_CLIENT_SECRET`, `AUTH_SECRET`) configurados con `wrangler secret put`
- `public/admin/config.yml` ya apunta a esta URL
- CMS probado y funcionando en producción (login por GitHub + edición real de
  un producto)

## ⚠️ Importante: siempre usar `--config wrangler.toml` desde aquí

Este repo tiene **dos** Workers: el sitio (`wrangler.jsonc` en la raíz) y este
worker de auth (`worker/wrangler.toml`). Correr `npx wrangler deploy` dentro
de `worker/` **sin `--config wrangler.toml`** puede resolver el wrangler.jsonc
de la raíz en vez del de esta carpeta y desplegar el sitio equivocado sobre
este Worker. Siempre:

```
cd worker
npx wrangler deploy --config wrangler.toml
```

### Incidente ya ocurrido por esto (2026-07-21)

Un PR automático de Cloudflare ("Wrangler autoconfig") proponía renombrar
este worker a un nombre que coincidía con el del sitio. Aunque el PR se
cerró sin fusionar, el sistema de *preview builds* de Cloudflare Workers
Builds ya había construido y desplegado esa rama como **preview**, y como el
nombre coincidía con este Worker en producción, lo sobrescribió con el
build del sitio — dejó este worker sirviendo el HTML del home y sin los
secretos configurados (`GITHUB_CLIENT_SECRET`/`AUTH_SECRET` se perdieron).

Si el login del CMS falla de nuevo con un error raro (404/500 en `/auth`, o
`/` de este worker muestra el sitio en vez de "Amarillo Primavera — CMS auth
worker"), repetir los pasos 5 y 6 de abajo para redesplegar y reconfigurar
secretos.

**Prevención:** cualquier PR automático de Cloudflare que proponga cambiar el
`name` en un `wrangler.jsonc`/`wrangler.toml` de este repo debe revisarse con
cuidado antes de dejarlo abierto — Cloudflare construye previews de PRs
abiertos automáticamente, y si el nombre propuesto coincide con un Worker
real, el preview lo sobrescribe. Mejor cerrar (o cerrar *y borrar la rama*)
apenas se detecte uno así.

## Referencia — cómo se hizo (por si hay que rehacerlo o rotar credenciales)

### 1. Registrar el subdominio workers.dev de la cuenta (una sola vez)

Se hace desde el dashboard de Cloudflare la primera vez que se despliega un
Worker en una cuenta nueva.

### 2. Autenticar wrangler

```
cd worker
npx wrangler login
```

### 3. Desplegar una vez para obtener la URL asignada

```
npx wrangler deploy --config wrangler.toml
```

### 4. Crear el GitHub OAuth App

En <https://github.com/settings/developers> → "New OAuth App", usando la URL
del paso 3:

- **Homepage URL:** `https://amarilloprimavera.com`
- **Authorization callback URL:** `https://<worker>.<subdominio>.workers.dev/callback`

### 5. Configurar credenciales

- `GITHUB_CLIENT_ID` va en `wrangler.toml` (no es secreto).
- `GITHUB_CLIENT_SECRET` y `AUTH_SECRET` se configuran con:

  ```
  npx wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.toml
  npx wrangler secret put AUTH_SECRET --config wrangler.toml   # cadena aleatoria: openssl rand -hex 32
  ```

### 6. Redesplegar y conectar el CMS

```
npx wrangler deploy --config wrangler.toml
```

Actualizar `base_url` en `public/admin/config.yml` con la URL del Worker y
hacer push a `main`.

### 7. Rotar credenciales si hace falta

Si el Client Secret se expone accidentalmente (ej. se comparte en texto
plano), regenerarlo en GitHub y volver a correr `wrangler secret put
GITHUB_CLIENT_SECRET --config wrangler.toml` con el nuevo valor.
