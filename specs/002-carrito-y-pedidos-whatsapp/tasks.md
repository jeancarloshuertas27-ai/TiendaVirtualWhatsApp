# Tasks: Módulo 002 - Gestión Completa del Carrito y Checkout vía WhatsApp (Sin Pagos)

**Input**: Design documents from `/specs/002-carrito-y-pedidos-whatsapp/`
**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/)
**Tests**: Se incluyen tareas de pruebas unitarias y de integración para validar la lógica del stepper, vaciado, navegación y generación del contrato de WhatsApp.
**Organization**: Las tareas están agrupadas por fase y por historia de usuario para permitir implementación y verificación independientes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Ejecución en paralelo permitida (archivos independientes, sin dependencias pendientes)
- **[Story]**: Identificador de la historia de usuario (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Rutas de archivo exactas en cada descripción

## Path Conventions

- Proyecto Frontend React SPA: `src/`, `tests/` en la raíz del repositorio

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verificación de estructura base y dependencias para los componentes del carrito.

- [X] T001 [P] Verify project dependencies and environment for Módulo 002 in `package.json`
- [X] T002 [P] Create test scaffold for WhatsApp URL generator and cart component tests in `tests/utils/whatsapp.test.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura y estado base que DEBEN estar listos antes de implementar las vistas de las historias de usuario.

> ⚠️ **CRITICAL**: No iniciar la UI de 'Tu Pedido' hasta completar el contexto ampliado y el formateador de WhatsApp.

- [X] T003 [P] Update `src/utils/whatsapp.js` to format order messages with conditional delivery notes (`📝 *Notas:* {deliveryNotes}` only when `deliveryNotes.trim().length > 0`), currency formatted strictly as Soles (`S/ [monto]`), and `buildWhatsAppUrl` with support for optional delivery notes per `specs/002-carrito-y-pedidos-whatsapp/contracts/whatsapp-order-url.md`
- [X] T004 [P] Implement unit tests verifying WhatsApp message and URL generation with notes, with whitespace-only notes (omitted), and without notes in `tests/utils/whatsapp.test.js`
- [X] T005 Extend `src/context/CartContext.jsx` with `deliveryNotes: string`, `setDeliveryNotes: (notes: string) => void`, `currentView: 'catalogo' | 'carrito'`, and `setCurrentView: (view: string) => void` according to `specs/002-carrito-y-pedidos-whatsapp/data-model.md`

**Checkpoint**: Estado global de sesión y generador de contratos WhatsApp listos y probados.

---

## Phase 3: User Story 1 - Navegación Bidireccional entre Catálogo y Carrito (Priority: P1) 🎯 MVP

**Goal**: Permitir la alternancia fluida entre la vista de Catálogo y la pantalla completa 'Tu Pedido' mediante el ícono superior, la pestaña inferior y el botón 'X'.

**Independent Test**: En el navegador, hacer clic en el ícono de bolsa de compras del encabezado o en la pestaña 'Carrito' de la barra inferior y comprobar la transición a 'Tu Pedido'; pulsar el botón circular 'X' o la pestaña 'Catálogo' y comprobar el retorno instantáneo al catálogo.

### Tests for User Story 1 🧪
- [X] T006 [P] [US1] Create navigation tests verifying view transitions between 'catalogo' and 'carrito' triggered by header cart icon, bottom nav tabs, and close button in `tests/components/CartPage.test.jsx`

### Implementation for User Story 1
- [X] T007 [P] [US1] Implement `CartHeader` with title "Tu Pedido", pluralized items badge (`{count} artículo` if count === 1 else `{count} artículos`), and circular close button with icon `close` ('X') calling `onClose` in `src/components/cart/CartHeader.jsx`
- [X] T008 [P] [US1] Update `src/components/Header.jsx` to dynamically show subtitle "Carrito" when `currentView === 'carrito'`, retain "Catálogo" otherwise, and wire `onCartClick` to navigate to `'carrito'`
- [X] T009 [P] [US1] Update `src/components/BottomNav.jsx` to highlight active tab (`text-primary font-semibold`) for 'Catálogo' or 'Carrito' based on `currentView` and trigger view navigation
- [X] T010 [US1] Integrate view switching logic in `src/App.jsx` to conditionally render the catalog view or `CartPage` container based on `currentView` while maintaining `localStorage` sync

**Checkpoint**: Navegación fluida y bidireccional funcional entre Catálogo y 'Tu Pedido'.

---

## Phase 4: User Story 2 - Ajuste de Cantidades y Eliminación Individual con Recálculo Inmediato (Priority: P1)

**Goal**: Permitir al comprador ajustar cantidades con stepper (`−`/`+` en rango `[1, 99]`), ver subtotales en tiempo real y eliminar artículos individualmente con el botón de papelera o decrementando por debajo de 1.

**Independent Test**: Agregar productos, abrir 'Tu Pedido', presionar `+` para incrementar la cantidad y comprobar el aumento instantáneo de subtotal y total; presionar `−` hasta que sea menor a 1 o pulsar el ícono de papelera y comprobar la eliminación del ítem y el recálculo automático.

### Tests for User Story 2 🧪
- [X] T011 [P] [US2] Create component tests for stepper quantity adjustments (+/- bounded to `[1, 99]`), item subtotal updates (`precio * cantidad`), decrement below 1 removal, and trash button removal in `tests/components/CartPage.test.jsx`

### Implementation for User Story 2
- [X] T012 [P] [US2] Implement `FreeShippingTracker` with verified icon, label "¡Genial! Calificas para Envío Gratis", "100%" badge, and emerald green progress bar (`bg-secondary`) in `src/components/cart/FreeShippingTracker.jsx`
- [X] T013 [P] [US2] Implement `CartItemRow` with thumbnail rounded container (`rounded-lg bg-surface-container-low`), single-line truncated title, attribute/category label, trash button (`delete` icon), stepper pill (`remove`/`add` with count), and subtotal in Soles (`S/ [monto]`) in `src/components/cart/CartItemRow.jsx`
- [X] T014 [US2] Implement `CartItemList` container mapping `items` to `CartItemRow` components with transition styling in `src/components/cart/CartItemList.jsx`

**Checkpoint**: Lista de artículos reactiva con stepper y eliminación individual operativa.

---

## Phase 5: User Story 3 - Manejo de Estado Vacío y Bloqueo de Acciones Inválidas (Priority: P1)

**Goal**: Mostrar la tarjeta de estado vacío cuando el carrito no tenga artículos (`items.length === 0`), con botón para regresar al catálogo y deshabilitando el botón de WhatsApp.

**Independent Test**: Vaciar todos los ítems del carrito; comprobar que desaparece la lista y aparece la tarjeta con ícono `shopping_basket`, título "Tu carrito está vacío" y botón "Explorar Catálogo". Comprobar que el botón de WhatsApp tiene estilos inactivos (`opacity-50 pointer-events-none`). Al pulsar "Explorar Catálogo", retornar a la vista catálogo.

### Tests for User Story 3 🧪
- [X] T015 [P] [US3] Create tests for empty cart state rendering, "Explorar Catálogo" CTA click, and WhatsApp button disabled state in `tests/components/CartPage.test.jsx`

### Implementation for User Story 3
- [X] T016 [P] [US3] Implement `CartEmptyState` with basket icon container (`shopping_basket`), title "Tu carrito está vacío", descriptive body text, and "Explorar Catálogo" button calling `onExploreCatalog` in `src/components/cart/CartEmptyState.jsx`
- [X] T017 [US3] Wire empty state conditional rendering in `src/components/cart/CartPage.jsx` when `items.length === 0`, hiding the shipping tracker and item list and exposing the exploration CTA

**Checkpoint**: Estado vacío y protecciones de envío en blanco completamente operacionales.

---

## Phase 6: User Story 4 - Notas de Entrega Opcionales y Checkout vía WhatsApp (Priority: P1)

**Goal**: Permitir escribir instrucciones de entrega opcionales y abrir WhatsApp con la orden formal preformateada en Soles sin pasarela de pagos.

**Independent Test**: Añadir productos, escribir "Dejar en conserjería" en el campo de notas, pulsar "Enviar pedido por WhatsApp" y verificar que se abre una pestaña hacia `https://wa.me/51999999999?text=...` con todos los ítems, total en Soles, envío gratis y la línea de notas.

### Tests for User Story 4 🧪
- [X] T018 [P] [US4] Create tests for `DeliveryNotesInput` controlled input state preservation and WhatsApp checkout URL generation with and without notes in `tests/components/CartPage.test.jsx`

### Implementation for User Story 4
- [X] T019 [P] [US4] Implement `DeliveryNotesInput` with `chat_bubble_outline` icon, controlled input with placeholder "Ej. Timbre número 4, dejar en conserjería...", and session state binding in `src/components/cart/DeliveryNotesInput.jsx`
- [X] T020 [P] [US4] Implement `OrderSummaryPanel` with Subtotal, Envío a Domicilio ("Promo GRATIS"), Total a pagar (`font-price-lg font-extrabold`), official WhatsApp button `#25D366` (disabled if `!hasItems`), and trust badges (`lock` "Compra 100% Segura", `flash_on` "Atención Inmediata") in `src/components/cart/OrderSummaryPanel.jsx`
- [X] T021 [US4] Assemble the full `CartPage` container combining `CartHeader`, `FreeShippingTracker`, `CartItemList`, `CartEmptyState`, `DeliveryNotesInput`, and `OrderSummaryPanel`, and connecting checkout to `window.open` with `buildWhatsAppUrl` in `src/components/cart/CartPage.jsx`

**Checkpoint**: Flujo de checkout completo por WhatsApp operativo de punta a punta.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verificación de calidad, consistencia visual con Stitch, pruebas automatizadas y compilación limpia.

- [X] T022 [P] Verify all monetary values and totals strictly display Soles currency format (`S/ [monto]`) across all cart views and message contracts
- [X] T023 Run full automated test suite with `npm test` and verify 100% passing tests
- [X] T024 Run production build with `npm run build` and ensure zero TypeScript or bundling errors
- [X] T025 Execute manual verification scenarios 1 to 4 from `specs/002-carrito-y-pedidos-whatsapp/quickstart.md`
- [X] T026 Verify repository hygiene, ensuring no private keys or tokens exist and `WHATSAPP_PHONE_NUMBER` is correctly configured in `src/config/constants.js`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sin dependencias previas - se ejecuta inmediatamente.
- **Foundational (Phase 2)**: Depende de Phase 1 - BLOQUEA las historias de usuario.
- **User Stories (Phase 3+)**: Dependen de la finalización de Foundational (Phase 2).
  - US1 (Navegación): Base de transición de pantallas.
  - US2 (Cantidades y eliminación): Manejo de ítems en el carrito.
  - US3 (Estado vacío): Condición de límite cuando `items.length === 0`.
  - US4 (Notas y WhatsApp): Formalización del pedido y checkout.
- **Polish (Phase 7)**: Depende de haber completado las 4 historias de usuario.

### User Story Dependencies

- **User Story 1 (P1)**: Puede iniciar tras Phase 2; define la navegación entre vistas.
- **User Story 2 (P1)**: Puede implementarse en paralelo o justo después de US1; opera sobre el array de ítems.
- **User Story 3 (P1)**: Depende de la presencia del contenedor de carrito y maneja el estado de lista vacía.
- **User Story 4 (P1)**: Integra notas y botón de checkout conectando la orden con WhatsApp.

### Within Each User Story

- Pruebas unitarias/componentes creadas antes de la implementación.
- Subcomponentes atómicos antes del contenedor integrado.
- Verificación del criterio independiente antes de continuar.

### Parallel Opportunities

- `T001` y `T002` en Phase 1 son paralelizables.
- `T003` y `T004` en Phase 2 pueden ejecutarse en paralelo (utilidad y tests).
- `T007`, `T008` y `T009` en Phase 3 pueden desarrollarse en paralelo al estar en archivos desacoplados.
- `T012` y `T013` en Phase 4 pueden crearse en paralelo.
- `T016` (estado vacío), `T019` (notas) y `T020` (resumen) pueden implementarse en paralelo.

---

## Parallel Example: User Story 1

```bash
# Implementar componentes de navegación en paralelo:
Task: "Implement CartHeader in src/components/cart/CartHeader.jsx"
Task: "Update Header subtitle in src/components/Header.jsx"
Task: "Update BottomNav active styling in src/components/BottomNav.jsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1: Setup
2. Completar Phase 2: Foundational (Contexto ampliado + utilitario de WhatsApp)
3. Completar Phase 3: User Story 1 (Navegación entre vistas)
4. Validar navegación bidireccional en el navegador

### Incremental Delivery

1. Setup + Foundational → Base reactiva lista
2. User Story 1 → Navegación fluida Catálogo ↔ Carrito (MVP inicial)
3. User Story 2 → Ajuste de cantidades y eliminación individual reactiva
4. User Story 3 → Manejo de estado vacío seguro
5. User Story 4 → Notas de entrega y envío formal por WhatsApp
6. Polish → Tests completos y build de producción

---

## Notes

- Todas las tareas siguen estrictamente el formato `- [ ] [TaskID] [P?] [Story?] Description with file path`.
- Moneda fijada exclusivamente en Soles (`S/ [monto]`), sin pasarelas de pago ni cobranza bancaria interna.
- Cero alcance fantasma: sin logins obligatorios.
- Al cerrar la feature, aplicar la regla de cierre estipulada en `AGENTS.md`.

