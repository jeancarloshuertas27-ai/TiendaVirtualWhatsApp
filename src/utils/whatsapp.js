import { WHATSAPP_PHONE_NUMBER } from '../config/constants';
import { formatPrice } from './formatters';

/**
 * Construye el mensaje estructurado para WhatsApp según el contrato formal de la Feature 002
 * @param {Array<{ name: string, quantity: number, subtotal: number }>} items
 * @param {number} totalAmount
 * @param {string} [deliveryNotes='']
 * @returns {string}
 */
export function buildWhatsAppMessage(items, totalAmount, deliveryNotes = '') {
  const lines = [
    '*¡Hola Nova Store! Quiero confirmar mi pedido:*',
    ''
  ];

  items.forEach(item => {
    lines.push(`• ${item.quantity}x ${item.name} - ${formatPrice(item.subtotal)}`);
  });

  lines.push('');
  lines.push(`*Total a pagar:* ${formatPrice(totalAmount)}`);
  lines.push('🚚 *Envío:* Gratis');

  const trimmedNotes = typeof deliveryNotes === 'string' ? deliveryNotes.trim() : '';
  if (trimmedNotes.length > 0) {
    lines.push(`📝 *Notas:* ${trimmedNotes}`);
  }

  lines.push('');
  lines.push('Por favor confírmenme disponibilidad y datos de pago. ¡Gracias!');

  return lines.join('\n');
}

/**
 * Construye la URL oficial y segura hacia wa.me codificando el mensaje con encodeURIComponent
 * @param {Array} items
 * @param {number} totalAmount
 * @param {string} [deliveryNotes='']
 * @param {string} [phoneNumber=WHATSAPP_PHONE_NUMBER]
 * @returns {string}
 */
export function buildWhatsAppUrl(items, totalAmount, deliveryNotes = '', phoneNumber = WHATSAPP_PHONE_NUMBER) {
  const message = buildWhatsAppMessage(items, totalAmount, deliveryNotes);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
