import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const productos = await getCollection("products");

  const datos = productos.map((producto) => ({
    id: producto.id,
    nombre: producto.data.nombre,
    categoria: producto.data.categoria,
    tags: producto.data.tags,
    descripcion: producto.body ?? "",
  }));

  return new Response(JSON.stringify(datos), {
    headers: { "Content-Type": "application/json" },
  });
};
