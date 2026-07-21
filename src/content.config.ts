import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const products = defineCollection({
  loader: glob({
    pattern: "*/description.md",
    base: "./src/content/products",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      categoria: z.string(),
      tags: z.array(z.string()).default([]),
      tono: z.string().optional(),
      disponible: z.boolean().default(true),
      imagenes: z.array(image()).default([]),
    }),
});

export const collections = { products };
