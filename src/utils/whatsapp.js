import { WHATSAPP_PHONE_NUMBER, STORE_NAME } from '../config/constants';
import { formatPrice } from './formatters';

/**
 * Construye el mensaje estructurado para WhatsApp según el contrato formal
 * @param {Array<{ name: string, quantity: number, subtotal: number }>} items
 * @param {number} totalAmount
 * @returns {string}
 */
export function buildWhatsAppMessage(items, totalAmount) {
  const lines = [
    `*¡Hola ${STORE_NAME}! Quiero confirmar mi pedido:*`,
    ''
  ];

  items.forEach(item => {
    lines.push(`• ${item.quantity}x ${item.name} - ${formatPrice(item.subtotal)}`);
  });

  lines.push('');
  lines.push(`*Total estimado:* ${formatPrice(totalAmount)}`);
  lines.push('🚚 *Envío:* Gratis prioritario 24h');
  lines.push('');
  lines.push('Por favor confírmenme disponibilidad y datos para la entrega. ¡Gracias!');

  return lines.join('\n');
}

/**
 * Construye la URL oficial y segura hacia wa.me
 * @param {Array} items
 * @param {number} totalAmount
 * @param {string} [phoneNumber=WHATSAPP_PHONE_NUMBER]
 * @returns {string}
 */
export function buildWhatsAppUrl(items, totalAmount, phoneNumber = WHATSAPP_PHONE_NUMBER) {
  const message = buildWhatsAppMessage(items, totalAmount);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

