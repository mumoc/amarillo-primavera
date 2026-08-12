#!/bin/bash
# Double-click this file to start the Amarillo Primavera dev server
# and open it in your browser.

cd "$(dirname "$0")"

PORT=4321
URL="http://localhost:$PORT"

echo "Starting npm run dev in $(pwd) ..."
npm run dev &
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
