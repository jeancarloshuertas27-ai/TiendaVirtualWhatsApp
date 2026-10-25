# Contrato de Integración: WhatsApp Checkout con Notas Opcionales

**Feature**: `002-carrito-y-pedidos-whatsapp`  
**Protocolo**: HTTPS / wa.me  
**Status**: Formal  

---

## 1. Endpoint y URL Generada

```text
https://wa.me/{WHATSAPP_PHONE_NUMBER}?text={ENCODED_MESSAGE}
```

- `WHATSAPP_PHONE_NUMBER`: Centralizado en `src/config/constants.js` (Ej. `"51999999999"`).
- `ENCODED_MESSAGE`: Procesado mediante `encodeURIComponent()`.

---

## 2. Plantilla de Mensaje con Notas Condicionales

### Caso A: Con notas de entrega (`deliveryNotes.trim().length > 0`)

```text
*¡Hola Nova Store! Quiero confirmar mi pedido:*

• {quantity}x {product_name} - S/ {item_subtotal}
[...demás ítems...]

*Total a pagar:* S/ {total_amount}
🚚 *Envío:* Gratis
📝 *Notas:* {deliveryNotes}

Por favor confírmenme disponibilidad y datos de pago. ¡Gracias!
```

### Caso B: Sin notas de entrega (`deliveryNotes.trim().length === 0`)

```text
*¡Hola Nova Store! Quiero confirmar mi pedido:*

• {quantity}x {product_name} - S/ {item_subtotal}
[...demás ítems...]

*Total a pagar:* S/ {total_amount}
🚚 *Envío:* Gratis

Por favor confírmenme disponibilidad y datos de pago. ¡Gracias!
```

---

## 3. Ejemplo Real Generado

```text
*¡Hola Nova Store! Quiero confirmar mi pedido:*

• 2x Nova Sonic Max - S/ 398.00
• 1x Apex Horizon GPS - S/ 149.50

*Total a pagar:* S/ 547.50
🚚 *Envío:* Gratis
📝 *Notas:* Timbre número 4, dejar en conserjería

Por favor confírmenme disponibilidad y datos de pago. ¡Gracias!
```

