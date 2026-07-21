export const SITE_NAME = "Amarillo Primavera";

// Número de WhatsApp del negocio en formato internacional sin espacios ni
// símbolos (52 = México + número a 10 dígitos).
export const WHATSAPP_NUMBER = "523121909068";

// Redes sociales. Deja el string vacío para ocultar el enlace en el sitio.
// Usa la URL completa (ej. "https://www.instagram.com/amarilloprimavera").
export const SOCIAL = {
  instagram: "https://www.instagram.com/amarillo.primavera",
  facebook: "https://www.facebook.com/profile.php?id=61572558061039",
} as const;

// Enlaces sociales que sí están configurados (para render condicional y schema).
export const socialLinks = Object.entries(SOCIAL)
  .filter(([, url]) => url.trim() !== "")
  .map(([red, url]) => ({ red, url }));

export function whatsappOrderLink(nombreProducto: string, urlProducto?: string): string {
  const partes = [`Hola, quiero pedir: ${nombreProducto}`];
  if (urlProducto) partes.push(urlProducto);
  const mensaje = partes.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

// Enlace genérico a WhatsApp (sin producto), para CTAs de "cómo pedir".
export function whatsappLink(mensaje = "Hola, me gustaría hacer un pedido 🌼"): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
