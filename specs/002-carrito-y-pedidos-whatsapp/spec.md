# Feature Specification: Módulo 002 - Gestión Completa del Carrito y Checkout vía WhatsApp (Sin Pagos)

**Feature Branch**: `002-carrito-y-pedidos-whatsapp`

**Created**: 2026-10-25

**Status**: Draft

**Input**: User description: "Permitir al comprador revisar su carrito en la vista 'Tu Pedido', aumentar o disminuir la cantidad de cada artículo, quitar productos individualmente (o vaciar el carrito mostrando el estado vacío), añadir una nota opcional de entrega y enviar el pedido completo formateado directamente hacia WhatsApp sin pasarela de pagos."

## Clarifications

### Session 2026-10-25
- Q: ¿Qué ocurre con las notas de entrega si el usuario vuelve al catálogo para añadir más productos y luego regresa al carrito? → A: El texto de las notas de entrega se preserva en el estado de la sesión para evitar que el comprador deba reescribirlo.
- Q: ¿Cómo se comporta la navegación al tocar la pestaña 'Carrito' en la barra inferior o el ícono superior en el Módulo 002? → A: Navega a la vista completa 'Tu Pedido', mientras que el botón de cierre ('X') o la pestaña 'Catálogo' retornan a la vista principal.
- Q: ¿Cómo se procesa el mensaje de WhatsApp si el campo de notas solo contiene espacios en blanco? → A: Se aplica `.trim()` y si el resultado es una cadena vacía, se omite por completo la línea de notas en el mensaje preformateado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navegación Bidireccional entre Catálogo y Carrito (Priority: P1)

Como comprador, quiero alternar de manera inmediata y fluida entre la vista de 'Catálogo' y la vista de 'Carrito' ('Tu Pedido') utilizando el ícono del carrito en el encabezado superior, el botón 'Ver Carro', la pestaña de 'Carrito' en la barra inferior o el botón de cierre ('X'), para gestionar mis artículos sin perder el estado de mi compra.

**Why this priority**: Es la base del flujo de navegación para que el cliente pueda acceder a la pantalla dedicada de revisión de compra y regresar al catálogo a seguir agregando productos.

**Independent Test**: Puede probarse de forma independiente en el navegador: al hacer clic en el ícono de carrito superior, en el botón 'Ver Carro' o en la pestaña 'Carrito' de la barra inferior, la vista transiciona a la pantalla completa 'Tu Pedido'. Al pulsar el botón redondo 'X' o la pestaña 'Catálogo', se regresa al catálogo principal con los productos intactos.

**Acceptance Scenarios**:

1. **Given** que el comprador está en la vista del catálogo con artículos en el carrito, **When** hace clic en el ícono de la bolsa de compras del encabezado o en la pestaña 'Carrito' de la barra inferior, **Then** la vista cambia a la pantalla 'Tu Pedido', el encabezado muestra el subtítulo 'Carrito', la pestaña 'Carrito' se destaca como activa y se listan los productos seleccionados.
2. **Given** que el comprador se encuentra en la vista 'Tu Pedido', **When** presiona el botón redondo con el ícono 'close' ('X') o la pestaña 'Catálogo' en la barra inferior, **Then** la vista regresa al catálogo principal preservando la posición y el estado del carrito.

---

### User Story 2 - Ajuste de Cantidades y Eliminación Individual con Recálculo Inmediato (Priority: P1)

Como comprador, quiero visualizar la lista detallada de los artículos agregados en tarjetas individuales con su imagen en miniatura, título, subtítulo/categoría, controles '−' y '+' y subtotal en Soles (S/), así como un botón de papelera ('delete') para remover cualquier ítem específico, actualizando en tiempo real los totales y el badge.

**Why this priority**: Brinda al cliente control total sobre la composición de su orden antes de despacharla, permitiendo ajustar volúmenes o retirar productos erróneos.

**Independent Test**: Añadir 2 productos al carrito, ir a 'Tu Pedido', presionar '+' en el primer producto para elevar su cantidad y verificar que su subtotal y el total a pagar aumentan de inmediato; luego presionar el ícono de papelera del segundo producto y verificar que se retira de la lista con una animación suave, recalculando el subtotal general.

**Acceptance Scenarios**:

1. **Given** un ítem en la lista del carrito con cantidad mayor a 1, **When** el usuario pulsa el botón '−', **Then** la cantidad se reduce en 1, el subtotal del ítem (`precio * cantidad`) se actualiza y el total consolidado a pagar disminuye en la misma proporción.
2. **Given** un ítem en la lista del carrito con cantidad 1, **When** el usuario pulsa el botón '−' o hace clic en el ícono de papelera ('delete'), **Then** el ítem se elimina de la lista del carrito con una transición visual suave (fade/slide), el contador del badge disminuye y los totales se recalculan.
3. **Given** cualquier tarjeta de producto en el carrito, **When** el usuario pulsa el botón '+', **Then** la cantidad aumenta hasta un máximo de 99 unidades, actualizando de inmediato los subtotales en Soles.

---

### User Story 3 - Manejo de Estado Vacío y Bloqueo de Acciones Inválidas (Priority: P1)

Como comprador, si elimino todos los productos del carrito o ingreso a 'Tu Pedido' sin haber añadido ningún artículo, quiero ver una tarjeta clara de estado vacío con la ilustración de cesta, el mensaje 'Tu carrito está vacío' y un botón de llamada a la acción para 'Explorar Catálogo', mientras el botón de WhatsApp se deshabilita para evitar envíos en blanco.

**Why this priority**: Evita errores operacionales y frustración al usuario, orientándolo positivamente a explorar la tienda cuando no tiene artículos por despachar.

**Independent Test**: Vaciar todos los ítems del carrito; comprobar que desaparece la lista de productos y el formulario de notas, apareciendo la tarjeta con el ícono 'shopping_basket', el título 'Tu carrito está vacío' y el botón 'Explorar Catálogo'. Verificar que el botón de WhatsApp se inhabilita. Al pulsar 'Explorar Catálogo', se debe regresar al catálogo de productos.

**Acceptance Scenarios**:

1. **Given** que el usuario elimina el último ítem disponible en el carrito, **When** se procesa la eliminación, **Then** la lista de productos se reemplaza por el contenedor de estado vacío ('Tu carrito está vacío'), el badge de artículos refleja '0 artículos' y el botón de WhatsApp adopta estado deshabilitado con opacidad reducida (`opacity-50 pointer-events-none`).
2. **Given** la tarjeta de estado vacío visible, **When** el usuario pulsa el botón 'Explorar Catálogo', **Then** la aplicación navega hacia el catálogo principal de productos.

---

### User Story 4 - Notas de Entrega Opcionales y Checkout vía WhatsApp (Priority: P1)

Como comprador, quiero escribir instrucciones personalizadas en el campo 'Notas para la entrega (opcional)' (por ejemplo: "Timbre 4, dejar en recepción") y presionar el botón verde oficial 'Enviar pedido por WhatsApp' para abrir WhatsApp con el mensaje estructurado completo en Soles listo para enviar al vendedor, sin pasar por pasarelas de pago.

**Why this priority**: Es el objetivo final del modelo de negocio de Nova Store: formalizar la orden de compra de forma directa, rápida y sin comisiones de intermediarios bancarios.

**Independent Test**: Con productos en el carrito, escribir "Entregar por la tarde" en las notas de entrega, presionar 'Enviar pedido por WhatsApp', verificar que se abre una nueva pestaña apuntando a `https://wa.me/51999999999?text=...` con el saludo, el desglose de productos en Soles (`• 2x Nova Sonic Max - S/ 398.00`), el total a pagar, el indicador de envío gratis y la línea `📝 *Notas:* Entregar por la tarde`.

**Acceptance Scenarios**:

1. **Given** una orden con al menos 1 artículo y una nota de entrega escrita, **When** el usuario hace clic en 'Enviar pedido por WhatsApp', **Then** el navegador abre una nueva pestaña hacia `https://wa.me/{numero}` con el mensaje codificado mediante `encodeURIComponent`, conteniendo el saludo, la lista de productos, el total a pagar, envío gratis y la sección de notas.
2. **Given** una orden sin notas de entrega (campo vacío o solo espacios), **When** el usuario presiona 'Enviar pedido por WhatsApp', **Then** el mensaje se genera omitiendo limpiamente la línea de `Notas:`, manteniendo la estructura legible y profesional.
3. **Given** que el usuario utiliza el botón 'Confirmar Pedido vía WhatsApp' desde el Drawer rápido en el catálogo, **When** lo presiona, **Then** se genera el mismo mensaje formal estructurado hacia el número centralizado.

---

### Edge Cases

- **Eliminación rápida múltiple**: Si el usuario pulsa varias veces seguidas el botón de eliminar o decrementar, el sistema debe procesar las eliminaciones de manera atómica sin desincronizar los cálculos del total.
- **Texto extenso en notas de entrega**: Si el cliente escribe una nota muy larga o con saltos de línea y emojis, el codificador `encodeURIComponent()` debe sanitizar y preservar el texto sin romper el formato ni truncar la URL de WhatsApp.
- **Recarga de página en la vista de carrito**: Si el usuario recarga la página estando en la vista 'Tu Pedido', la aplicación debe inicializarse en dicha vista conservando los ítems de `localStorage` y el contenido escrito en las notas si estuviera en curso.
- **Caracteres especiales en nombres de productos**: Los nombres de productos con tildes o caracteres especiales (ej. 'Cafetera Gourmet & Acero') deben codificarse correctamente para verse nítidos en el chat de WhatsApp.
- **Preservación de notas entre cambios de vista**: Si el usuario redacta una nota, regresa al catálogo a revisar otro producto y vuelve al carrito, el texto de la nota no se borra.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La aplicación DEBE soportar navegación fluida entre la vista principal de 'Catálogo' y la vista de 'Carrito' ('Tu Pedido'), manteniendo una única fuente de verdad en el estado y sincronizándolo en `localStorage` (`novastore_cart_v1`).
- **FR-002**: La cabecera contextual de la vista 'Tu Pedido' DEBE incluir:
  - Título principal 'Tu Pedido'.
  - Badge dinámico que exprese la cantidad exacta con pluralización adecuada (`{count} artículo` si es 1, `{count} artículos` si es diferente de 1).
  - Botón circular de cierre con ícono `close` ('X') que retorna al catálogo.
- **FR-003**: Debajo del título de la orden, la vista DEBE mostrar la tarjeta de incentivo '¡Genial! Calificas para Envío Gratis' con ícono `verified` en color secundario, etiqueta '100%' y una barra de progreso horizontal verde esmeralda (`bg-secondary`).
- **FR-004**: Cada tarjeta de producto en la lista del carrito (`cart-list`) DEBE mostrar:
  - Miniatura cuadrada con bordes redondeados (`rounded-lg bg-surface-container-low`) y foto nítida.
  - Título descriptivo truncado a una línea.
  - Etiqueta o subtítulo descriptivo (ej. categoría o atributo del ítem).
  - Botón de papelera con ícono `delete` en color tenue que al pulsar elimina el ítem con animación de salida (`opacity-0 scale-95`).
  - Stepper con cápsula redondeada (`bg-surface-container-low`) con botón `remove` ('−'), número central en negrita y botón `add` ('+').
  - Subtotal del producto en Soles (`S/ [monto]`), calculado como `precio_unitario * cantidad`.
- **FR-005**: Si la cantidad de un ítem es 1 y se presiona el botón '−', el sistema DEBE tratarlo como una acción de eliminación del producto del carrito, removiéndolo y actualizando los totales.
- **FR-006**: Cuando el carrito quede en 0 productos (`items.length === 0`), el sistema DEBE:
  - Ocultar la lista de productos y la barra de progreso de envío.
  - Mostrar la tarjeta centrada de estado vacío (`cart-empty-state`) con el ícono `shopping_basket`, el título 'Tu carrito está vacío', el mensaje descriptivo y el botón 'Explorar Catálogo'.
  - Deshabilitar el botón de WhatsApp aplicándole estilos visuales de inactividad (`opacity-50 pointer-events-none`).
- **FR-007**: La vista DEBE incorporar una tarjeta de entrada para 'Notas para la entrega (opcional)', con ícono `chat_bubble_outline`, campo de texto (`input`) con placeholder 'Ej. Timbre número 4, dejar en conserjería...' y soporte de escritura libre, conservando el texto durante la sesión.
- **FR-008**: La tarjeta de resumen financiero DEBE desglosar con total fidelidad a Stitch:
  - 'Subtotal' formateado en Soles (`S/ XX.XX`).
  - 'Envío a Domicilio' con pastilla 'Promo' y el texto 'GRATIS' en color secundario.
  - Divisor de línea (`h-px bg-surface-container-high`).
  - 'Total a pagar' en tipografía destacada y precio en Soles (`font-price-lg font-extrabold`).
- **FR-009**: El botón oficial de checkout DEBE respetar la identidad visual de WhatsApp:
  - Fondo verde oficial `#25D366` con hover `#128C7E`, ícono vectorial SVG oficial de WhatsApp y texto 'Enviar pedido por WhatsApp'.
  - Al presionarse, DEBE abrir en una nueva pestaña (`_blank`) la URL generada:
    `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(mensaje)}`.
  - El mensaje DEBE respetar estrictamente la plantilla en español de Perú:
    ```text
    *¡Hola Nova Store! Quiero confirmar mi pedido:*

    • {cantidad}x {nombre_producto} - S/ {subtotal}
    [...demás ítems...]

    *Total a pagar:* S/ {total}
    🚚 *Envío:* Gratis
    📝 *Notas:* {notas} (solo si el comprador ingresó notas válidas no vacías)

    Por favor confírmenme disponibilidad y datos de pago. ¡Gracias!
    ```
- **FR-010**: El número telefónico de recepción DEBE leerse de la constante centralizada `WHATSAPP_PHONE_NUMBER` en `src/config/constants.js`, sin exponer credenciales ni tokens en el repositorio.
- **FR-011**: Al pie del resumen financiero DEBEN mostrarse las insignias de confianza:
  - 'Compra 100% Segura' con ícono `lock`.
  - 'Atención Inmediata' con ícono `flash_on`.
- **FR-012**: La barra de navegación inferior fija DEBE mantenerse visible, marcando la pestaña 'Carrito' como activa (`text-primary font-semibold`) y permitiendo volver a 'Catálogo' con un solo toque.

### Key Entities

- **ItemCarrito**: Representa un artículo seleccionado en la orden.
  - Atributos: `productId` (número), `name` (cadena), `price` (número en Soles), `imageUrl` (cadena URL), `attribute` (cadena), `quantity` (número entre 1 y 99), `subtotal` (número calculado).
- **OrdenCarrito**: Representa la orden consolidada.
  - Atributos: `items` (arreglo de `ItemCarrito`), `totalCount` (sumatoria de cantidades), `totalAmount` (sumatoria de subtotales), `deliveryNotes` (cadena de texto opcional).
- **MensajeWhatsApp**: Cadena de texto preformateada codificada para la API `wa.me`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: La transición entre la vista de Catálogo y la vista de Carrito se ejecuta de forma instantánea (tiempo de respuesta percibido < 100 milisegundos).
- **SC-002**: Modificar cantidades (+/-) o eliminar un producto recalcula y actualiza todos los valores en pantalla (subtotal del ítem, subtotal general y total a pagar) en menos de 50 milisegundos sin recargar la página.
- **SC-003**: El 100% de los pedidos enviados por WhatsApp generan una URL válida que incluye los nombres exactos, cantidades, precios unitarios, total en Soles y notas ingresadas por el cliente.
- **SC-004**: Al vaciar el carrito, la interfaz muestra el estado vacío en el 100% de los casos y desactiva el botón de WhatsApp de forma preventiva.
- **SC-005**: La interfaz replica con 100% de fidelidad visual la paleta cromática, espaciados, tipografía Inter e íconos Material Symbols del prototipo `stitch-referencias/panel_del_carrito_y_confirmaci_n/code.html`.

## Assumptions

- No existe pasarela de pagos con tarjeta de crédito, débito ni billeteras virtuales dentro de la aplicación; el cobro y la coordinación de pago y entrega se realizan exclusivamente vía WhatsApp con el comerciante.
- El costo de envío se asume siempre gratuito ("GRATIS") como beneficio promocional fijo para todo el país.
- Las notas de entrega son opcionales y no exceden el límite de longitud de una URL estándar de WhatsApp en navegadores móviles (máximo 2000 caracteres recomendados).
- La aplicación opera como Single Page Application (SPA), alternando entre las vistas 'catalogo' y 'carrito' mediante estado de vista interno reactivo.
