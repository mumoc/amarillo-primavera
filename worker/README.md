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

Falta solo: conectar el repo a Cloudflare Pages (ver `docs/deploy.md`) para
que `/admin/` sea accesible en el sitio público, y probar el login real desde
ahí.

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
npx wrangler deploy
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
  npx wrangler secret put GITHUB_CLIENT_SECRET
  npx wrangler secret put AUTH_SECRET   # cadena aleatoria: openssl rand -hex 32
  ```

### 6. Redesplegar y conectar el CMS

```
npx wrangler deploy
```

Actualizar `base_url` en `public/admin/config.yml` con la URL del Worker y
hacer push a `main`.

### 7. Rotar credenciales si hace falta

Si el Client Secret se expone accidentalmente (ej. se comparte en texto
plano), regenerarlo en GitHub y volver a correr `wrangler secret put
GITHUB_CLIENT_SECRET` con el nuevo valor.
