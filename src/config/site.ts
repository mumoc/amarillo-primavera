export const SITE_NAME = "Amarillo Primavera";

// TODO: reemplazar con el número real de WhatsApp del negocio (formato
// internacional sin espacios ni símbolos, ej. "5213121234567").
export const WHATSAPP_NUMBER = "5210000000000";

export function whatsappOrderLink(nombreProducto: string): string {
  const mensaje = `Quiero pedir: ${nombreProducto}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
