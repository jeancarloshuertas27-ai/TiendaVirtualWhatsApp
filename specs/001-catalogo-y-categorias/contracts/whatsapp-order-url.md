# Contrato de Integración: WhatsApp Order URL & Message Schema

**Feature**: `001-catalogo-y-categorias`  
**Protocolo**: HTTPS / Redirección Web (`https://wa.me/`)  
**Status**: Formal  

---

## 1. Estructura de la URL de WhatsApp

Toda derivación del pedido hacia WhatsApp debe invocar el endpoint estándar:
```text
https://wa.me/{WHATSAPP_PHONE_NUMBER}?text={ENCODED_MESSAGE}
```

### Parámetros:
- `WHATSAPP_PHONE_NUMBER`: Cadena numérica internacional sin espacios, signos `+` ni guiones. Configurable en `src/config/constants.js`. (Ejemplo por defecto para Perú: `"51999999999"`).
- `ENCODED_MESSAGE`: Texto plano formateado procesado mediante `encodeURIComponent()`.

---

## 2. Esquema del Mensaje Estructurado

El mensaje plano debe estructurarse con las siguientes secciones:

```text
*¡Hola Nova Store! Quiero confirmar mi pedido:*

• {quantity}x {product_name} - S/ {item_subtotal}
[...repetición por cada ítem en el carrito...]

*Total estimado:* S/ {total_amount}
🚚 *Envío:* Gratis prioritario 24h

Por favor confírmenme disponibilidad y datos para la entrega. ¡Gracias!
```

### Ejemplo Generado en Producción:
```text
*¡Hola Nova Store! Quiero confirmar mi pedido:*

• 2x Nova Sonic Max - S/ 398.00
• 1x Apex Horizon GPS - S/ 149.50

*Total estimado:* S/ 547.50
🚚 *Envío:* Gratis prioritario 24h

Por favor confírmenme disponibilidad y datos para la entrega. ¡Gracias!
```

---

## 3. Comportamiento en Navegador

- La apertura de la URL debe realizarse mediante `window.open(url, '_blank', 'noopener,noreferrer')` o un hipervínculo `<a target="_blank">`.
- En dispositivos móviles, el sistema operativo abrirá directamente la aplicación nativa de WhatsApp.
- En navegadores de escritorio, se abrirá WhatsApp Web en una nueva pestaña sin bloquear ni desconfigurar la tienda virtual.

