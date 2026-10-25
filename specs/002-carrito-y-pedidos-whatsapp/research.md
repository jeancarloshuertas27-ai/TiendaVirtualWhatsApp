# Research & Architecture Decisions: Módulo 002 - Gestión Completa del Carrito y Checkout vía WhatsApp

**Feature**: `002-carrito-y-pedidos-whatsapp`  
**Date**: 2026-10-25  
**Status**: Completed  

---

## 1. Estrategia de Navegación entre Vistas (Catálogo vs Carrito)

- **Decision**: Gestión de vista activa (`activeView: 'catalogo' | 'carrito'`) mediante estado reactivo unificado en el componente raíz (`App.jsx`) o `CartContext`.
- **Rationale**: 
  - La tienda es una SPA ligera y ágil orientada a navegación móvil con pestañas fijas (`bottom nav`).
  - Evita introducir dependencias pesadas de enrutamiento del lado del cliente (`react-router-dom`), cumpliendo con el Principio 1 de la Constitución (Simplicidad y KISS).
  - La alternancia de vistas es síncrona (<10ms) y conserva la posición del scroll y el estado de la sesión.
- **Alternatives Considered**:
  - *React Router / TanStack Router*: Descartados por sobrecarga innecesaria para una aplicación de 2 vistas principales sin requerimientos de URLs anidadas complejas.

---

## 2. Modelado de Notas de Entrega y Estado de la Sesión

- **Decision**: Administrar `deliveryNotes` dentro del `CartContext` con persistencia en memoria durante la sesión activa.
- **Rationale**: 
  - Si el comprador redacta notas (ej. "Dejar en portería"), navega temporalmente al catálogo para agregar un producto más y regresa al carrito, el texto se preserva intacto sin frustración.
  - Se vincula directamente con la función constructora de mensajes para WhatsApp.
- **Alternatives Considered**:
  - *Guardar notas en localStorage*: Descartado para no dejar notas residuales en compras futuras del mismo navegador.
  - *Estado local aislado en input*: Descartado porque perdería el valor al cambiar de vista.

---

## 3. Comportamiento Reactivo del Estado Vacío y Deshabilitación de WhatsApp

- **Decision**: Renderizado condicional reactivo en `CartPage`:
  - Si `items.length > 0`: Muestra el tracker de envío gratis, la lista de productos y el campo de notas.
  - Si `items.length === 0`: Oculta la lista y el tracker, y despliega la tarjeta `CartEmptyState` (`Tu carrito está vacío`).
  - El botón oficial de WhatsApp en el resumen inferior se inhabilita con clases de Tailwind `opacity-50 pointer-events-none` y propiedad `disabled={true}`.
- **Rationale**: 
  - Replica fielmente la lógica de `panel_del_carrito_y_confirmaci_n/code.html` (función `recalculateCart()`).
  - Previene que el usuario envíe órdenes vacías a WhatsApp.

---

## 4. Generación de Enlace Seguro para WhatsApp

- **Decision**: Función `buildWhatsAppUrl(items, totalAmount, deliveryNotes, phoneNumber)` con codificación completa mediante `encodeURIComponent()`.
- **Rationale**: 
  - Cumple con los estándares internacionales de la API de WhatsApp Web/móvil (`https://wa.me/`).
  - Aplica `.trim()` sobre las notas de entrega para omitir limpiamente la línea `📝 *Notas:*` si el campo está vacío.
  - Mantiene el número de destino centralizado en `src/config/constants.js` sin secretos.

