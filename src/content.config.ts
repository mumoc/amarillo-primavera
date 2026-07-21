import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const products = defineCollection({
  loader: glob({
    pattern: "*/description.md",
    base: "./src/content/products",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) => {
    const bloqueHistoria = z.discriminatedUnion("tipo", [
      z.object({
        tipo: z.literal("quote"),
        texto: z.string(),
      }),
      z.object({
        tipo: z.literal("imagen"),
        src: image(),
        alt: z.string().optional(),
      }),
      z.object({
        tipo: z.literal("texto"),
        parrafos: z.array(z.string()),
      }),
      z.object({
        tipo: z.literal("timeline"),
        etapas: z.array(
          z.object({
            titulo: z.string(),
            texto: z.string().optional(),
            imagenes: z.array(image()).default([]),
          }),
        ),
      }),
      z.object({
        tipo: z.literal("testimonio"),
        texto: z.string(),
        autor: z.string().optional(),
      }),
      z.object({
        tipo: z.literal("galeria"),
        imagenes: z.array(image()),
      }),
    ]);

    return z.object({
      nombre: z.string(),
      categoria: z.string(),
      tags: z.array(z.string()).default([]),
      tono: z.string().optional(),
      disponible: z.boolean().default(true),
      imagenes: z.array(image()).default([]),
      historia: z
        .object({
          titulo: z.string(),
          bloques: z.array(bloqueHistoria).default([]),
        })
        .optional(),
    });
  },
});

export const collections = { products };
