---
name: agregar-historia-producto
description: Agrega o edita la sección "La historia detrás de esta creación" en la página de un producto. Usa cuando el usuario dice "agrega la historia de este producto", "cuéntame cómo se hizo <producto>", "quiero contar la historia de <slug>", "agrega una sección de historia a <producto>".
---

# Historia de Producto

Sección editorial opcional en la página de detalle de un producto
(`/productos/<slug>/`), que aparece **debajo** de la tarjeta principal
(imagen + info) solo si el producto tiene el campo `historia` en su
frontmatter. Productos sin `historia` se ven exactamente igual que antes —
no rompe nada agregarla o quitarla.

Referencia viva: `src/content/products/paty/description.md` (ejemplo real y
completo, usa todos los tipos de bloque).

## Modelo de datos

En el frontmatter de `description.md`:

```yaml
historia:
  titulo: "La historia detrás de <nombre>"
  bloques:
    - tipo: quote
      texto: "Frase corta y emotiva."
    - tipo: imagen
      src: historia/hero.jpg
      alt: "Descripción de la foto"
    - tipo: texto
      parrafos:
        - "Primer párrafo."
        - "Segundo párrafo."
    - tipo: timeline
      etapas:
        - titulo: "Nombre de la etapa"
          texto: "Qué pasó en esta etapa (opcional)."
          imagenes:
            - historia/proceso-1.jpg
            - historia/proceso-2.jpg
    - tipo: testimonio
      texto: "Cita de alguien que recibió el producto."
      autor: "Quién lo dijo (opcional)"
    - tipo: galeria
      imagenes:
        - historia/galeria-1.jpg
        - historia/galeria-2.jpg
```

**Reglas de los bloques:**

- `bloques` es un arreglo — el orden en que se listan es el orden en que se
  muestran. Se pueden repetir tipos de bloque (ej. dos `texto` con un
  `timeline` en medio) y omitir los que no apliquen. Todos son opcionales
  excepto `titulo` de la sección misma.
- `tipo: timeline` → cada etapa puede traer 0, 1, 2, o 3+ imágenes; el
  componente ajusta el layout solo (una imagen grande, dos en columnas, tres
  o más en tira horizontal). No hay que preocuparse por eso al redactar.
- `tipo: testimonio` se muestra como cita editorial destacada (fondo crema,
  cursiva) — úsalo para comentarios reales de clientes/familia, no para
  descripción de producto.
- Las imágenes de `historia` van en una subcarpeta `historia/` dentro del
  producto (`src/content/products/<slug>/historia/`), separadas de
  `images/` (que son las fotos del catálogo/galería normal del producto).
  Referencia las rutas como `historia/archivo.jpg` en el YAML.

## Flujo de trabajo

1. Si el usuario te da el texto de la historia en lenguaje natural (como
   párrafos sueltos, no estructurado), tú decides cómo repartirlo entre los
   tipos de bloque — no le pidas que lo estructure él. Un patrón que suele
   funcionar bien: `quote` de apertura → `imagen` hero → `texto` de
   introducción → `timeline` con las etapas del proceso → `testimonio` si
   hay uno → `texto` de cierre → `galeria` final. No hace falta usar todos
   los tipos siempre; usa los que la historia real tenga.
2. Revisa el tono contra `brand/voice.md` (cálido, cercano, nostálgico sin
   ser anticuado) antes de escribir los bloques de texto.
3. **Imágenes**: si el usuario no tiene fotos reales todavía, genera
   placeholders claramente marcados como tal (ej. con ImageMagick: fondo con
   gradiente de marca + texto "IMAGEN DUMMY" + descripción de qué foto
   falta ahí) para poder previsualizar el diseño. Nunca uses una imagen
   dummy sin dejarlo explícito en el texto de la imagen. Cuando el usuario
   pegue fotos reales en el chat, guárdalas reemplazando los dummies (usa
   los nombres de archivo que el usuario dé, o pregunta a qué bloque
   corresponde cada una si no es obvio).
4. Corre `npm run build` para verificar que el schema es válido (Zod
   fallará con un mensaje claro si falta algún campo requerido de un
   bloque).
5. Sugiere revisar con `npm run dev` antes de publicar (skill
   `vista-previa-producto` / `enviar-a-produccion`).

## Quitar la sección

Para quitar la historia de un producto, borra el campo `historia` completo
del frontmatter (y opcionalmente la carpeta `historia/` de ese producto si
ya no se usa). La página vuelve a verse como antes automáticamente.
