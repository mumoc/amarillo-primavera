// Lista las fotos de la carpeta "Amarillo Primavera" del Drive que todavia no
// se han revisado (las que no estan en docs/drive-procesadas.json, por md5).
// Uso: npm run revisar-drive [-- <ruta a la carpeta del Drive>]
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { homedir } from "node:os";

const RAIZ = new URL("..", import.meta.url).pathname;
const DRIVE =
  process.argv[2] ??
  join(homedir(), "Library/CloudStorage/GoogleDrive-barriga.adela@gmail.com/My Drive/Amarillo Primavera");
const EXT = /\.(jpe?g|png|webp|heic)$/i;

if (!existsSync(DRIVE)) {
  console.error(`No encuentro la carpeta del Drive: ${DRIVE}`);
  process.exit(1);
}

const { fotos } = JSON.parse(readFileSync(join(RAIZ, "docs/drive-procesadas.json"), "utf8"));
const recorrer = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? recorrer(join(dir, e.name)) : EXT.test(e.name) ? [join(dir, e.name)] : [],
  );

const conteo = {};
const nuevas = [];
for (const ruta of recorrer(DRIVE)) {
  const md5 = createHash("md5").update(readFileSync(ruta)).digest("hex");
  const ya = fotos[md5];
  if (ya) conteo[ya.estado] = (conteo[ya.estado] ?? 0) + 1;
  else nuevas.push(relative(DRIVE, ruta));
}

for (const [estado, n] of Object.entries(conteo)) console.log(`${String(n).padStart(4)}  ${estado}`);
console.log(`${String(nuevas.length).padStart(4)}  NUEVAS (sin revisar)`);
for (const f of nuevas.sort()) console.log(`      ${f}`);
