#!/bin/bash
# Double-click this file to start the Amarillo Primavera dev server
# and open it in your browser.

cd "$(dirname "$0")"

# Astro 7 requiere Node >= 22.12. Al abrir este archivo directo desde Finder,
# bash no carga ~/.zshrc y por lo tanto no se activa mise: sin esto se usaría
# el Node del sistema y `npm run dev` fallaría.
MISE="$HOME/.local/bin/mise"
if [ -x "$MISE" ]; then
  eval "$("$MISE" activate bash --shims 2>/dev/null)" || true
  RUN=("$MISE" exec --)
else
  RUN=()
fi

NODE_MAJOR="$("${RUN[@]}" node -p "process.versions.node.split('.')[0]" 2>/dev/null)"
if [ -z "$NODE_MAJOR" ] || [ "$NODE_MAJOR" -lt 22 ]; then
  echo "Error: se necesita Node >= 22.12 (Astro 7). Instálalo con:"
  echo "  mise install"
  echo "Presiona Enter para cerrar."
  read -r
  exit 1
fi

PORT=4321
URL="http://localhost:$PORT"

echo "Starting npm run dev in $(pwd) (node $("${RUN[@]}" node -v)) ..."
"${RUN[@]}" npm run dev &
DEV_PID=$!

echo "Waiting for $URL to respond..."
for i in $(seq 1 60); do
  if curl -s -o /dev/null "$URL"; then
    echo "Server is up. Opening browser..."
    open "$URL"
    break
  fi
  sleep 1
done

# Keep this window open and attached to the dev server so closing the
# window (or Ctrl+C) stops the server too.
wait $DEV_PID
