# Feature Specification: Módulo 001 - Catálogo Interactivo de Productos y Adición al Carrito

**Feature Branch**: `001-catalogo-y-categorias`

**Created**: 2026-10-25

**Status**: Draft

**Input**: User description: "Construir la vista principal de la tienda virtual NOVA STORE donde los clientes puedan visualizar el catálogo de productos en una cuadrícula responsiva de 2 columnas, filtrar por categorías, elegir la cantidad deseada mediante controles '+' y '-' en cada tarjeta y añadir productos al carrito de compras con retroalimentación visual inmediata."

## Clarifications

### Session 2026-10-25
- Q: ¿Cómo debe comportarse la barra flotante inferior ('quick-order-bar') cuando el carrito tiene 0 artículos al ingresar a la tienda? → A: Permanece oculta mientras el carrito esté vacío (`totalItems === 0`) y aparece automáticamente con transición suave al añadir el primer producto.
- Q: ¿Qué acción debe ejecutar la pestaña 'Carrito' de la barra inferior de navegación en la vista del catálogo? → A: Despliega el cajón modal (Drawer) 'Tu Orden Actual' como acceso directo al resumen rápido del pedido en el Módulo 001.
- Q: ¿Qué sucede con el Drawer al presionar 'Confirmar Pedido vía WhatsApp'? → A: Abre el enlace oficial de WhatsApp (`https://wa.me/...`) en una nueva pestaña con el mensaje estructurado y cierra automáticamente el Drawer.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Exploración y Visualización del Catálogo en Cuadrícula (Priority: P1)

Como comprador, quiero visualizar una cuadrícula responsiva de 2 columnas con tarjetas de productos que contengan su imagen fotográfica, etiqueta de destaque, título descriptivo, subtítulo/característica clave, disponibilidad y precio en Soles (S/), para conocer la oferta comercial de la tienda de forma atractiva y ordenada.

**Why this priority**: Es la interfaz central y punto de entrada de la tienda. Sin el catálogo visual de productos, los compradores no tienen acceso a la oferta y el negocio no puede operar.

**Independent Test**: Puede probarse de forma independiente abriendo la aplicación en un navegador web: debe mostrar el encabezado de 'NOVA STORE - Catálogo' y las 6 tarjetas de producto distribuidas en 2 columnas con sus precios en Soles (S/).

**Acceptance Scenarios**:

1. **Given** que el comprador accede a la página principal de Nova Store, **When** carga la interfaz en pantalla móvil o de escritorio, **Then** visualiza las tarjetas de producto en una cuadrícula de 2 columnas, cada una con su imagen nítida, insignia superior (ej. 'Audio Pro', 'Nuevo', 'Gourmet'), nombre del producto, descripción breve, disponibilidad o atributo, y su precio en Soles (S/).
2. **Given** que la cuadrícula de productos está cargada, **When** el comprador hace scroll sobre el catálogo, **Then** la cuadrícula fluye con suavidad y el encabezado superior con el logo y el contador de la orden permanece visible.

---

### User Story 2 - Filtrado Dinámico por Categorías (Priority: P2)

Como comprador, quiero presionar las píldoras de categoría ('Todos', 'Audio', 'Wearables', 'Accesorios', 'Hogar') situadas en el carrusel horizontal superior para filtrar de inmediato los productos visibles según mis intereses de compra.

**Why this priority**: Facilita la navegación rápida y reduce el esfuerzo de búsqueda del cliente, mejorando la conversión y la usabilidad en dispositivos móviles.

**Independent Test**: Puede probarse pulsando sobre la categoría 'Audio'; la vista debe reducir la cuadrícula para mostrar exclusivamente los productos de audio ('Nova Sonic Max' y 'Pebble 360 Audio'), marcando la píldora activa con estilo resaltado.

**Acceptance Scenarios**:

1. **Given** que el catálogo muestra todos los productos con la píldora 'Todos' seleccionada por defecto, **When** el usuario pulsa sobre la categoría 'Wearables', **Then** la interfaz actualiza la cuadrícula para mostrar únicamente el producto 'Apex Horizon GPS' y la píldora 'Wearables' adopta el estado activo visualmente destacado.
2. **Given** que el catálogo se encuentra filtrado por cualquier categoría específica, **When** el usuario pulsa nuevamente sobre 'Todos', **Then** se restablece la vista completa mostrando los 6 productos disponibles.

---

### User Story 3 - Ajuste de Cantidad y Adición al Carrito (Priority: P1)

Como comprador, quiero usar los botones '−' y '+' dentro de cada tarjeta de producto para fijar la cantidad deseada (entre 1 y 99) y presionar el botón 'Añadir' para sumarlo a mi orden, recibiendo confirmación visual instantánea ('✓ Listo' en verde por 1 segundo) mientras se actualizan el contador del encabezado y la barra flotante.

**Why this priority**: Es el mecanismo esencial de interacción para que el usuario construya su pedido. Garantiza que la selección de ítems sea clara, reactiva y persistente.

**Independent Test**: En cualquier tarjeta, incrementar la cantidad a 2 con '+', presionar 'Añadir' y verificar que el botón muestra '✓ Listo' durante ~1 segundo, regresa a 1, el badge superior aumenta en 2 unidades, la barra inferior refleja el nuevo total en Soles y los datos persisten al recargar la página.

**Acceptance Scenarios**:

1. **Given** una tarjeta de producto con contador en 1, **When** el usuario presiona el botón '+', **Then** el contador numérico de la tarjeta se incrementa en una unidad hasta un tope máximo de 99.
2. **Given** una tarjeta con contador superior a 1, **When** el usuario presiona el botón '−', **Then** el contador disminuye en una unidad sin bajar de 1.
3. **Given** una cantidad seleccionada (ej. 3 unidades), **When** el usuario pulsa 'Añadir', **Then** el botón cambia temporalmente su texto e icono a '✓ Listo' con fondo verde esmeralda por aproximadamente 1 segundo, el contador local de la tarjeta se reinicia a 1, y la cantidad total de artículos se suma al carrito global.
4. **Given** productos agregados en el carrito, **When** el comprador recarga o refresca la pestaña del navegador, **Then** el estado de los productos seleccionados y sus cantidades se recupera íntegramente desde el almacenamiento local.

---

### User Story 4 - Resumen Rápido en Barra Flotante y Cajón Deslizable (Priority: P2)

Como comprador, quiero ver una barra flotante fija en la parte inferior con el total acumulado y tocar 'Ver Carro' o la pestaña 'Carrito' para abrir un cajón deslizable ('Tu Orden Actual') que resuma los productos añadidos, sus cantidades y el total en Soles, permitiéndome validar mi compra antes de ir a WhatsApp o al carrito completo.

**Why this priority**: Proporciona visibilidad constante del costo acumulado del pedido y permite una pre-revisión ágil sin abandonar el catálogo.

**Independent Test**: Añadir productos al carrito, verificar que la barra inferior muestra "X productos • S/ Total", hacer clic en "Ver Carro", validar que se despliega el Drawer modal con la lista de productos y que se puede cerrar tocando el botón 'close', el fondo sombreado o confirmando vía WhatsApp.

**Acceptance Scenarios**:

1. **Given** que el usuario ha añadido productos al carrito (`totalItems >= 1`), **When** visualiza la parte inferior de la pantalla, **Then** observa la barra flotante con el ícono de bolsa, indicador de actividad, el texto '{N} productos • S/ {Total}' y el botón 'Ver Carro'.
2. **Given** la barra flotante visible o pulsando la pestaña 'Carrito', **When** el usuario toca 'Ver Carro' o la barra, **Then** se despliega suavemente desde la base el Drawer modal 'Tu Orden Actual' con los ítems ordenados, sus cantidades, precios y el botón para confirmar vía WhatsApp.
3. **Given** el Drawer abierto, **When** el comprador presiona el botón 'close' o hace clic en el área exterior oscurecida, **Then** el Drawer se oculta suavemente regresando el foco al catálogo.
4. **Given** el Drawer abierto con productos, **When** el usuario hace clic en 'Confirmar Pedido vía WhatsApp', **Then** se abre WhatsApp Web/móvil con el mensaje pre-armado en una pestaña nueva y el Drawer se cierra.

---

### Edge Cases

- **Intento de decrementar por debajo de 1**: El botón '−' debe deshabilitarse o ser inerte cuando la cantidad de la tarjeta es 1, impidiendo cantidades cero o negativas en la tarjeta.
- **Tope superior de cantidad**: El botón '+' no debe permitir incrementar más allá de 99 unidades por operación de adición individual.
- **Adición múltiple del mismo ítem**: Si un producto ya está en el carrito y se añade nuevamente desde la tarjeta, el sistema debe acumular la cantidad en el ítem existente en lugar de duplicar la fila en el resumen.
- **Categoría sin productos adicionales**: Si una categoría contiene un subconjunto de productos, el filtrado debe ser inmediato sin parpadeos ni deformación del diseño de cuadrícula.
- **Persistencia con datos corruptos**: Si la información guardada en el almacenamiento local del navegador está dañada o vacía, el sistema debe inicializarse de manera segura con el carrito en cero sin arrojar excepciones.
- **Carrito vacío en inicio**: Al cargar la aplicación sin compras previas (`totalItems === 0`), la barra flotante no se muestra para no obstruir la navegación del catálogo; se activa de inmediato con transición animada al primer 'Añadir'.
- **Cierre del Drawer tras acción**: Al confirmar pedido vía WhatsApp o pulsar 'close', el Drawer regresa a su posición oculta (`translate-y-full`) y restaura el scroll normal del catálogo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La interfaz principal DEBE mostrar un encabezado superior fijo con la marca 'NOVA STORE - Catálogo', ícono de bolsa de compras (`shopping_bag`) y una insignia numérica en color verde secundario que refleje en tiempo real la cantidad total de unidades en el carrito.
- **FR-002**: La pantalla DEBE incluir un carrusel horizontal deslizante con 5 píldoras de filtro de categoría ('Todos', 'Audio', 'Wearables', 'Accesorios', 'Hogar'), donde exactamente una categoría permanece activa a la vez.
- **FR-003**: Debajo del filtro de categorías, el sistema DEBE mostrar un micro-banner informativo de beneficio con el texto "Envíos express prioritarios en 24h a todo el país" y la etiqueta destacada "GRATIS".
- **FR-004**: El catálogo DEBE renderizar en una cuadrícula estricta de 2 columnas los 6 productos oficiales extraídos del prototipo Stitch, adaptados a la moneda Soles (S/):
  1. **Nova Sonic Max**: Etiqueta 'Audio Pro', descripción 'Cancelación activa', disponibilidad 'Stock listo', categoría 'Audio', precio `S/ 199.00`.
  2. **Apex Horizon GPS**: Etiqueta 'Nuevo', descripción 'Titanio y Zafiro', atributo '42mm', categoría 'Wearables', precio `S/ 149.50`.
  3. **Mochila Nomad Core**: Etiqueta '22 Litros', descripción 'Impermeable IPX5', disponibilidad 'Popular', categoría 'Accesorios', precio `S/ 89.50`.
  4. **Aero Pure Leather**: Etiqueta 'Calzado', descripción 'Cuero ecológico', atributo 'Tallas 38-44', categoría 'Accesorios', precio `S/ 129.00`.
  5. **Atelier Pour-Over**: Etiqueta 'Gourmet', descripción 'Vidrio & Acero', disponibilidad 'Edición Limitada', categoría 'Hogar', precio `S/ 110.00`.
  6. **Pebble 360 Audio**: Etiqueta '360° Sound', descripción 'Batería 18h', disponibilidad 'IP67', categoría 'Audio', precio `S/ 68.00`.
- **FR-005**: Cada tarjeta de producto DEBE contener un selector de cantidad independiente con botones '−' y '+' y un contador numérico con rango restringido de 1 a 99.
- **FR-006**: Al pulsar el botón 'Añadir' en una tarjeta, el sistema DEBE:
  - Incorporar la cantidad seleccionada al carrito de compras.
  - Transformar el botón a estado afirmativo ('✓ Listo' con ícono `check` y estilo verde secundario) durante un lapso de 1.0 a 1.2 segundos.
  - Revertir el botón a su estado normal ('Añadir') y reiniciar el contador de la tarjeta a 1.
  - Desencadenar una animación sutil de pulso en la insignia del carrito.
- **FR-007**: El estado completo del carrito de compras DEBE persistir automáticamente en el almacenamiento local del navegador (`localStorage`) para conservarse entre recargas y sesiones.
- **FR-008**: El sistema DEBE contar con una barra flotante inferior fija (`quick-order-bar`) que permanezca oculta mientras el carrito esté vacío (`totalItems === 0`) y se muestre automáticamente en cuanto exista al menos 1 artículo. La barra DEBE mostrar el recuento consolidado de artículos, el monto total acumulado formateado como `S/ [Total]` y un botón de acción rápida 'Ver Carro'.
- **FR-009**: Al pulsar la barra flotante, el botón 'Ver Carro' o la pestaña 'Carrito' de la barra inferior de navegación, el sistema DEBE abrir un cajón modal deslizable (Drawer) titulado 'Tu Orden Actual', detallando los productos agregados, cantidades, precio unitario, subtotal consolidado y botón de confirmación vía WhatsApp. Al pulsar 'Confirmar Pedido vía WhatsApp', se abre la URL correspondiente en una nueva pestaña y se cierra el Drawer.
- **FR-010**: En la parte inferior fija DEBE figurar una barra de navegación con cuatro pestañas ('Catálogo', 'Carrito', 'Pedidos', 'Perfil'), manteniendo activa y destacada la opción 'Catálogo'.

### Key Entities

- **Producto**: Representa un ítem disponible en el catálogo de Nova Store.
  - Atributos: Identificador único (`id`), nombre (`name`), categoría (`category`), etiqueta superior (`badge`), descripción corta (`description`), atributo secundario (`attribute`), precio unitario en Soles (`price`), URL de imagen (`imageUrl`).
- **ItemCarrito**: Representa un producto incorporado a la orden del cliente.
  - Atributos: Referencia a producto (`productId`), producto denormalizado o vinculado, cantidad seleccionada (`quantity`), precio unitario (`unitPrice`), subtotal calculado (`subtotal = unitPrice * quantity`).
- **Carrito**: Estado consolidado de la orden del cliente.
  - Atributos: Colección de ítems (`items`), total de unidades (`totalItems`), monto acumulado en Soles (`totalAmount`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Los usuarios pueden explorar el catálogo de 6 productos y añadir al menos un producto al carrito en menos de 10 segundos desde la carga de la página.
- **SC-002**: El filtrado por categorías responde de manera instantánea (en menos de 100 milisegundos), mostrando de inmediato los productos coincidentes sin parpadeo.
- **SC-003**: El 100% de las adiciones al carrito reflejan inmediatamente el cambio en el contador del encabezado, el feedback visual del botón ('✓ Listo') y el monto de la barra flotante.
- **SC-004**: Al recargar la página en el navegador, el 100% de los productos previamente agregados se mantienen en el carrito con sus cantidades exactas.
- **SC-005**: El diseño visual replica con 100% de fidelidad la cuadrícula de 2 columnas, tipografía Inter, íconos Material Symbols y paleta de colores del prototipo de referencia Stitch.

## Assumptions

- Los precios de los 6 productos se adaptan formalmente a la moneda oficial peruana (Soles, S/) manteniendo los valores numéricos de la referencia Stitch (199.00, 149.50, 89.50, 129.00, 110.00, 68.00).
- El catálogo base es de 6 productos estáticos y no requiere por ahora conexión a una API remota ni panel de administración de inventario.
- Las imágenes de los productos utilizan las URLs oficiales de Google Cloud Storage provistas en el prototipo `code.html` de Stitch.
- Las pestañas 'Pedidos' y 'Perfil' de la barra de navegación inferior son accesos visuales de navegación complementaria para la experiencia mobile-tab, mientras que 'Carrito' en esta vista abre el Drawer modal 'Tu Orden Actual' para previsualizar la orden.
