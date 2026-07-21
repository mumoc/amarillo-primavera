export interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  AUTH_SECRET: string;
}

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const STATE_TTL_MS = 10 * 60 * 1000;

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function makeState(secret: string): Promise<string> {
  const encoded = btoa(JSON.stringify({ ts: Date.now(), nonce: crypto.randomUUID() }));
  return `${encoded}.${await hmac(secret, encoded)}`;
}

async function verifyState(secret: string, state: string): Promise<boolean> {
  const [encoded, signature] = state.split(".");
  if (!encoded || !signature) return false;
  if ((await hmac(secret, encoded)) !== signature) return false;

  try {
    const { ts } = JSON.parse(atob(encoded));
    return Date.now() - ts < STATE_TTL_MS;
  } catch {
    return false;
  }
}

function html(body: string): Response {
  return new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

function renderCallbackPage(message: string): string {
  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(event) {
          window.opener.postMessage(${JSON.stringify(message)}, event.origin);
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const state = await makeState(env.AUTH_SECRET);
      const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
      authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authorizeUrl.searchParams.set("redirect_uri", `${url.origin}/callback`);
      authorizeUrl.searchParams.set("scope", "repo,user");
      authorizeUrl.searchParams.set("state", state);
      return Response.redirect(authorizeUrl.toString(), 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");

      if (!code || !state || !(await verifyState(env.AUTH_SECRET, state))) {
        return html(
          renderCallbackPage(
            `authorization:github:error:${JSON.stringify({ message: "Estado inválido o expirado. Intenta iniciar sesión de nuevo." })}`,
          ),
        );
      }

      const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const tokenData = (await tokenResponse.json()) as {
        access_token?: string;
        error_description?: string;
      };

      if (!tokenData.access_token) {
        return html(
          renderCallbackPage(
            `authorization:github:error:${JSON.stringify({ message: tokenData.error_description ?? "No se pudo obtener el token de acceso." })}`,
          ),
        );
      }

      return html(
        renderCallbackPage(
          `authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: "github" })}`,
        ),
      );
    }

    return new Response("Amarillo Primavera — CMS auth worker", { status: 200 });
  },
};
