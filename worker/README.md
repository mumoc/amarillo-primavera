# CMS Auth Worker

Cloudflare Worker que implementa el flujo de OAuth con GitHub para Sveltia CMS
(`/public/admin/`). Implementa el protocolo estándar de Decap/Sveltia CMS:
`/auth` redirige a GitHub, `/callback` intercambia el código por un token y se
lo pasa de vuelta al admin vía `postMessage`.

## Pasos para activarlo (requieren tu cuenta, no se pueden automatizar)

### 1. Crear el GitHub OAuth App

En <https://github.com/settings/developers> → "New OAuth App":

- **Application name:** Amarillo Primavera CMS
- **Homepage URL:** `https://amarilloprimavera.com` (o la URL de preview de Cloudflare Pages mientras el dominio no esté conectado)
- **Authorization callback URL:** `https://<nombre-del-worker>.<tu-subdominio>.workers.dev/callback`
  (el subdominio lo asigna Cloudflare al desplegar por primera vez — puedes desplegar primero con un client_id de prueba, ver la URL asignada, y luego crear el OAuth App con esa URL)

Guarda el **Client ID** y genera un **Client Secret**.

### 2. Autenticar wrangler con tu cuenta de Cloudflare

```
cd worker
npx wrangler login
```

### 3. Configurar el Client ID (no es secreto)

Edita `wrangler.toml` y reemplaza `REEMPLAZAR_CON_CLIENT_ID` con el Client ID real.

### 4. Configurar los secretos

```
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put AUTH_SECRET   # cualquier cadena aleatoria larga, ej: openssl rand -hex 32
```

### 5. Desplegar

```
npm install
npx wrangler deploy
```

Wrangler imprime la URL final (`https://amarillo-primavera-cms-auth.<subdominio>.workers.dev`).

### 6. Conectar la URL del Worker al CMS

Edita `public/admin/config.yml` en la raíz del repo y reemplaza `base_url` con
la URL real del Worker. Vuelve a desplegar el sitio (push a `main`).

### 7. Probar

Abre `https://amarilloprimavera.com/admin/` (o la URL de preview), inicia
sesión con GitHub y confirma que se ve la colección "Productos" con los 120
productos migrados.
