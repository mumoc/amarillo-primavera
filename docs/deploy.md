# Deploy — Cloudflare Pages

Estos pasos requieren tu sesión de Cloudflare/GitHub y no se pueden automatizar
desde aquí.

## 1. Conectar el repo a Cloudflare Pages

1. Dashboard de Cloudflare → **Workers & Pages** → **Create** → pestaña **Pages** → **Connect to Git**.
2. Selecciona el repo `mumoc/amarillo-primavera`.
3. Configuración de build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Cada push a `main` vuelve a desplegar automáticamente; los PRs generan preview deployments.

## 2. Conectar el dominio

En el proyecto de Pages → **Custom domains** → agregar `amarilloprimavera.com`
(y `www.amarilloprimavera.com` si se quiere ese alias). Como el dominio ya
está en el mismo Cloudflare Registrar/cuenta, el DNS se configura solo.

## 3. Activar el CMS (Sveltia)

Sigue `worker/README.md` para desplegar el Worker de OAuth y conectar
`public/admin/config.yml` a su URL real.

## 4. Pendientes antes de considerar el sitio "listo para producción"

- **Número de WhatsApp real**: `src/config/site.ts` tiene un placeholder
  (`5210000000000`). Reemplazar con el número real del negocio antes de
  anunciar el sitio.
- **Campo `disponible`**: todos los productos migrados quedaron en
  `disponible: true` por defecto (no había dato de existencia real en el
  catálogo anterior). Ajustar producto por producto vía el CMS una vez esté
  activo, o pedirle a Claude que lo haga en lote si me das la lista.
- **Categorías casi duplicadas**: "Coronas y diademas" / "Coronas y diademas
  florales" y "Muñecas" / "Muñecas de trapo" generan páginas de categoría
  separadas. Vale la pena unificarlas como limpieza de contenido.
- **`products/PENDIENTES/`**: la carpeta "creaciones de madera" y las fotos
  sueltas de la raíz siguen sin catalogar, tal como se decidió.
