// Genera docs/fotos-del-sitio.md: todas las fotos del catalogo, con su huella
// (md5) y cuales productos ya reviso Carlos (docs/fotos-revisadas.json).
// Uso: npm run indice-fotos
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import sharp from "sharp";

const RAIZ = new URL("..", import.meta.url).pathname;
const PRODUCTOS = join(RAIZ, "src/content/products");
const SALIDA = join(RAIZ, "docs/fotos-del-sitio.md");
const revisadas = JSON.parse(readFileSync(join(RAIZ, "docs/fotos-revisadas.json"), "utf8"));
const EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
// Distancia maxima (de 64 bits) para considerar dos fotos la misma toma.
const UMBRAL_PARECIDAS = 6;

// dHash: 64 bits que cambian poco si la foto solo se recorta o recomprime.
async function huellaVisual(ruta) {
  const px = await sharp(ruta).rotate().grayscale().resize(9, 8, { fit: "fill" }).raw().toBuffer();
  let bits = 0n;
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++) bits = (bits << 1n) | (px[y * 9 + x] > px[y * 9 + x + 1] ? 1n : 0n);
  return bits;
}
const distancia = (a, b) => [...(a ^ b).toString(2)].filter((c) => c === "1").length;

const productos = [];
for (const slug of readdirSync(PRODUCTOS).sort()) {
  const md = join(PRODUCTOS, slug, "description.md");
  if (!existsSync(md)) continue;
  const fm = yaml.load(readFileSync(md, "utf8").split(/^---$/m)[1]) ?? {};
  const listadas = (fm.imagenes ?? []).map((r) => r.replace(/^images\//, ""));
  const dir = join(PRODUCTOS, slug, "images");
  const archivos = existsSync(dir) ? readdirSync(dir).filter((f) => EXT.test(f)) : [];
  // Primero en el orden de la ficha, luego las que no estan listadas.
  const orden = [...listadas.filter((f) => archivos.includes(f)), ...archivos.filter((f) => !listadas.includes(f)).sort()];
  const fotos = [];
  for (const archivo of orden) {
    const ruta = join(dir, archivo);
    const { width, height } = await sharp(ruta).metadata();
    fotos.push({
      archivo,
      listada: listadas.includes(archivo),
      md5: createHash("md5").update(readFileSync(ruta)).digest("hex"),
      tam: `${width}×${height}`,
      huella: await huellaVisual(ruta),
    });
  }
  productos.push({ slug, nombre: fm.nombre ?? slug, categoria: fm.categoria ?? "", fotos });
}

// Pares de fotos que parecen la misma toma (dentro de un producto o entre dos).
const todas = productos.flatMap((p) => p.fotos.map((f) => ({ ...f, slug: p.slug })));
const parecidas = [];
for (let i = 0; i < todas.length; i++)
  for (let j = i + 1; j < todas.length; j++) {
    const d = distancia(todas[i].huella, todas[j].huella);
    if (d <= UMBRAL_PARECIDAS) parecidas.push({ a: todas[i], b: todas[j], d });
  }

const total = todas.length;
const nRev = productos.filter((p) => revisadas[p.slug]).length;
const L = [];
L.push("# Fotos del sitio");
L.push("");
L.push("> Generado con `npm run indice-fotos`. No lo edites a mano: la revision se anota en");
L.push("> `docs/fotos-revisadas.json` y luego se regenera este archivo.");
L.push("");
L.push("Punto de partida cuando lleguen fotos nuevas:");
L.push("");
L.push("1. Saca el md5 de cada foto nueva (`md5 -q foto.jpg`) y búscalo aquí: si aparece, ya está en el sitio.");
L.push("2. Si no aparece, compárala a ojo con las fotos del producto al que va: puede ser la misma toma con otro recorte.");
L.push("3. Los productos marcados ✅ ya los revisó Carlos foto por foto: no les quites ni reordenes fotos sin preguntarle.");
L.push("4. Los ⏳ nadie los ha revisado todavía; se revisan uno por uno, nunca en bloque.");
L.push("");
L.push(`**${productos.length} productos · ${total} fotos · ${nRev} productos revisados por Carlos.**`);
L.push("");
L.push("## Revisados por Carlos");
L.push("");
L.push("| Producto | Fotos | Fecha | Qué se decidió |");
L.push("|---|---|---|---|");
for (const p of productos.filter((p) => revisadas[p.slug]).sort((a, b) => revisadas[a.slug].fecha.localeCompare(revisadas[b.slug].fecha)))
  L.push(`| [${p.nombre}](#${p.slug}) | ${p.fotos.length} | ${revisadas[p.slug].fecha} | ${revisadas[p.slug].nota} |`);
L.push("");
L.push("## Pendientes de revisar");
L.push("");
L.push("| Producto | Categoría | Fotos |");
L.push("|---|---|---|");
for (const p of productos.filter((p) => !revisadas[p.slug]))
  L.push(`| [${p.nombre}](#${p.slug}) | ${p.categoria} | ${p.fotos.length} |`);
L.push("");
L.push("## Posibles repetidas");
L.push("");
if (parecidas.length === 0) L.push("Ninguna.");
else {
  L.push("Pares que el script ve casi iguales (misma toma, otro recorte o compresión). Hay que verlas antes de borrar: a veces son dos piezas distintas.");
  L.push("");
  L.push("| Foto A | Foto B | Distancia |");
  L.push("|---|---|---|");
  for (const { a, b, d } of parecidas.sort((x, y) => x.d - y.d))
    L.push(`| ${a.slug}/${a.archivo} | ${b.slug}/${b.archivo} | ${d === 0 && a.md5 === b.md5 ? "idénticas" : d} |`);
}
L.push("");
L.push("## Todas las fotos, por producto");
L.push("");
L.push("La primera de cada lista es la portada. «No listada» = está en la carpeta pero no en `imagenes:` (por ejemplo, fotos de la historia).");
for (const p of productos) {
  L.push("");
  L.push(`### ${p.slug}`);
  L.push("");
  L.push(`${p.nombre} · ${p.categoria} · ${revisadas[p.slug] ? `✅ revisado ${revisadas[p.slug].fecha}` : "⏳ sin revisar"}`);
  L.push("");
  if (p.fotos.length === 0) {
    L.push("Sin fotos.");
    continue;
  }
  L.push("| # | Archivo | Tamaño | md5 |");
  L.push("|---|---|---|---|");
  p.fotos.forEach((f, i) => L.push(`| ${f.listada ? i + 1 : "no listada"} | ${f.archivo} | ${f.tam} | \`${f.md5}\` |`));
}
L.push("");
writeFileSync(SALIDA, L.join("\n"));
console.log(`${SALIDA}: ${productos.length} productos, ${total} fotos, ${nRev} revisados, ${parecidas.length} pares parecidos.`);
