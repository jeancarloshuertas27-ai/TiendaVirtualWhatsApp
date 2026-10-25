import { describe, it, expect } from 'vitest';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../../src/utils/whatsapp';
import { WHATSAPP_PHONE_NUMBER } from '../../src/config/constants';

describe('WhatsApp Utils (Feature 002 Contract)', () => {
  const sampleItems = [
    {
      productId: 1,
      name: 'Nova Sonic Max',
      price: 199.00,
      quantity: 2,
      subtotal: 398.00,
    },
    {
      productId: 2,
      name: 'Apex Horizon GPS',
      price: 149.50,
      quantity: 1,
      subtotal: 149.50,
    },
  ];

  it('construye el mensaje estructurado con notas válidas', () => {
    const totalAmount = 547.50;
    const notes = 'Timbre número 4, dejar en conserjería';
    const message = buildWhatsAppMessage(sampleItems, totalAmount, notes);

    expect(message).toContain('*¡Hola Nova Store! Quiero confirmar mi pedido:*');
    expect(message).toContain('• 2x Nova Sonic Max - S/ 398.00');
    expect(message).toContain('• 1x Apex Horizon GPS - S/ 149.50');
    expect(message).toContain('*Total a pagar:* S/ 547.50');
    expect(message).toContain('🚚 *Envío:* Gratis');
    expect(message).toContain('📝 *Notas:* Timbre número 4, dejar en conserjería');
    expect(message).toContain('Por favor confírmenme disponibilidad y datos de pago. ¡Gracias!');
  });

  it('omite la línea de notas cuando el campo está vacío', () => {
    const totalAmount = 547.50;
    const message = buildWhatsAppMessage(sampleItems, totalAmount, '');

    expect(message).toContain('*Total a pagar:* S/ 547.50');
    expect(message).toContain('🚚 *Envío:* Gratis');
    expect(message).not.toContain('📝 *Notas:*');
  });

  it('omite la línea de notas cuando el campo contiene únicamente espacios en blanco', () => {
    const totalAmount = 547.50;
    const message = buildWhatsAppMessage(sampleItems, totalAmount, '   \t  \n  ');

    expect(message).toContain('🚚 *Envío:* Gratis');
    expect(message).not.toContain('📝 *Notas:*');
  });

  it('genera la URL de WhatsApp codificada con encodeURIComponent()', () => {
    const totalAmount = 547.50;
    const notes = 'Dejar en conserjería & llamar al timbre #4';
    const url = buildWhatsAppUrl(sampleItems, totalAmount, notes);

    expect(url.startsWith(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=`)).toBe(true);
    const encodedPart = url.replace(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=`, '');
    const decodedMessage = decodeURIComponent(encodedPart);

    expect(decodedMessage).toContain('*¡Hola Nova Store! Quiero confirmar mi pedido:*');
    expect(decodedMessage).toContain('• 2x Nova Sonic Max - S/ 398.00');
    expect(decodedMessage).toContain('📝 *Notas:* Dejar en conserjería & llamar al timbre #4');
  });
});

