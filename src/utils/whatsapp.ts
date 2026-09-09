import { CartItem } from "@/types/product";
import { formatPriceARS } from "./formatters";
import { STORE_CONFIG } from "@/data/config";

/**
 * Builds the wa.me checkout link with full item details, quantities, prices, and total.
 * All text is properly encoded via encodeURIComponent.
 */
export function generateWhatsAppOrderUrl(
  items: CartItem[],
  subtotal: number,
  phoneNumber: string = STORE_CONFIG.whatsappNumber
): string {
  if (items.length === 0) return "";

  const lines: string[] = [
    `¡Hola ${STORE_CONFIG.name}! 👋`,
    "Quisiera confirmar el siguiente pedido desde la tienda web:",
    "",
    "📋 *RESUMEN DEL PEDIDO:*",
  ];

  items.forEach(({ product, quantity }) => {
    const unitPrice = product.precio_promo ?? product.precio;
    const itemTotal = unitPrice * quantity;
    lines.push(
      `• *${quantity}x* ${product.nombre} [${product.marca} - ${product.cantidad}] → ${formatPriceARS(itemTotal)}`
    );
  });

  lines.push("");
  lines.push(`💰 *TOTAL FINAL:* ${formatPriceARS(subtotal)}`);
  lines.push("");
  lines.push("📍 *DATOS PARA EL ENVÍO:*");
  lines.push("• Nombre completo:");
  lines.push("• Domicilio y Localidad:");
  lines.push("• Medio de pago (Transferencia / Mercado Pago):");
  lines.push("");
  lines.push("¿Me confirman disponibilidad y el total con costo de envío? ¡Muchas gracias!");

  const rawMessage = lines.join("\n");
  const encodedMessage = encodeURIComponent(rawMessage);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
