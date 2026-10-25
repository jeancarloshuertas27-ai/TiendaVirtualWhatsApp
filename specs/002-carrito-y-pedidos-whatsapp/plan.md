# Implementation Plan: Módulo 002 - Gestión Completa del Carrito y Checkout vía WhatsApp (Sin Pagos)

**Branch**: `002-carrito-y-pedidos-whatsapp` | **Date**: 2026-10-25 | **Spec**: [specs/002-carrito-y-pedidos-whatsapp/spec.md](spec.md)

**Input**: Feature specification from `/specs/002-carrito-y-pedidos-whatsapp/spec.md`

## Summary

Implementar la vista completa dedicada del carrito de compras ('Tu Pedido') para **NOVA STORE**, siguiendo con fidelidad milimétrica el diseño HTML y Tailwind de [stitch-referencias/panel_del_carrito_y_confirmaci_n/code.html](file:///c:/Users/usuario/mis-proyectos/tienda-whatsapp/stitch-referencias/panel_del_carrito_y_confirmaci_n/code.html). La solución incluye navegación bidireccional entre 'Catálogo' y 'Tu Pedido', gestión de cantidades mediante stepper (`−`/`+`), eliminación reactiva con botón de papelera o decremento por debajo de 1, tarjeta de estado vacío ilustrada ('Tu carrito está vacío') con CTA de retorno, campo de texto para instrucciones de entrega opcionales, panel de desglose financiero en Soles (`S/`) y el botón oficial `#25D366` de WhatsApp para formalizar la orden preformateada en una nueva pestaña sin pasarela de pagos.

## Technical Context

**Language/Version**: JavaScript (ES2022+) / React 18+  
**Primary Dependencies**: React 18+, Vite 5+, Tailwind CSS 3+, Inter Font, Material Symbols Outlined  
**Storage**: `localStorage` (`novastore_cart_v1`) para los ítems del carrito; estado en memoria para notas de entrega durante la sesión activa  
**Testing**: Vitest + React Testing Library  
**Target Platform**: Navegadores web modernos (Web Móvil prioritaria y escritorio adaptable)  
**Project Type**: Frontend Web Application (SPA sin backend)  
**Performance Goals**: Alternancia de vista < 100ms, recálculo reactivo de precios y subtotales < 50ms  
**Constraints**: 
- Prohibición estricta de pasarelas de pago (sin cobro con tarjeta ni billeteras virtuales).
- Prohibición de login obligatorio.
- Moneda fijada exclusivamente en Soles (`S/ [monto]`).
- Fidelidad visual del 100% a `stitch-referencias/panel_del_carrito_y_confirmaci_n/code.html` y tokens de `DESIGN.md`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio Constitucional | Evaluación en el Plan Módulo 002 | Estado |
|--------------------------|----------------------------------|--------|
| **1. Simplicidad y fidelidad al alcance** | Cero pasarelas de pago y cero cobros bancarios. Checkout derivado directamente hacia WhatsApp (`https://wa.me/`). | **PASS** |
| **2. Idioma y moneda** | Toda la interfaz de 'Tu Pedido', desglose financiero y plantilla de WhatsApp en español de Perú y Soles (`S/`). | **PASS** |
| **3. Cero alcance fantasma y fidelidad a Stitch** | 100% de apego a `panel_del_carrito_y_confirmaci_n/code.html` (tracker de envío gratis, tarjetas de ítems, estado vacío, notas, resumen y badges de confianza). | **PASS** |
| **4. Verificable por el profesor en segundos** | Flujos probables en navegador (`npm run dev`) y persistencia en `localStorage`. Tests automatizados con `npm test`. | **PASS** |
| **5. Código limpio y sin secretos** | Cero credenciales privadas. Número de WhatsApp centralizado en `src/config/constants.js`. | **PASS** |

*Resultado del Gate*: **APROBADO (5/5 principios cumplidos sin violaciones).**

## Project Structure

### Documentation (this feature)

```text
specs/002-carrito-y-pedidos-whatsapp/
├── spec.md                  # Especificación formal de casos de uso y requerimientos
├── checklists/
│   └── requirements.md      # Checklist de validación de calidad
├── plan.md                  # Este plan de implementación arquitectónica
├── research.md              # Decisiones de arquitectura y navegación
├── data-model.md            # Entidades, estado reactivo y diagrama de estados
├── quickstart.md            # Guía de verificación paso a paso
└── contracts/
    ├── whatsapp-order-url.md # Contrato de mensaje y URL de WhatsApp con notas
    └── ui-components.md     # Jerarquía y contratos de propiedades de la vista carrito
```

### Source Code (repository root)

```text
src/
├── App.jsx                           # Integración de alternancia de vista (catalogo <-> carrito)
├── config/
│   └── constants.js                  # WHATSAPP_PHONE_NUMBER centralizado
├── context/
│   └── CartContext.jsx               # Soporte de deliveryNotes, currentView y acciones reactivas
├── hooks/
│   └── useCart.js                    # Consumo del contexto
├── components/
│   ├── Header.jsx                    # Actualización de subtítulo dinámico ('Catálogo' / 'Carrito')
│   ├── BottomNav.jsx                 # Resaltado de pestaña activa ('Catálogo' o 'Carrito')
│   ├── QuickOrderBar.jsx             # Disparador a vista 'Tu Pedido'
│   └── cart/
│       ├── CartPage.jsx              # Vista principal de 'Tu Pedido'
│       ├── CartHeader.jsx            # Título 'Tu Pedido', badge de artículos y botón 'X'
│       ├── FreeShippingTracker.jsx   # Tarjeta '¡Genial! Calificas para Envío Gratis' (100%)
│       ├── CartItemRow.jsx           # Fila de producto con stepper, papelera y subtotal
│       ├── CartEmptyState.jsx        # Tarjeta 'Tu carrito está vacío' + botón 'Explorar Catálogo'
│       ├── DeliveryNotesInput.jsx    # Campo de texto para instrucciones de entrega
│       └── OrderSummaryPanel.jsx     # Desglose financiero, botón WhatsApp (#25D366) y trust badges
└── utils/
    ├── formatters.js                 # Formato monetario en Soles y pluralización de artículos
    └── whatsapp.js                   # Generador de mensaje estructurado con notas condicionales
tests/
├── components/
│   └── CartPage.test.jsx             # Pruebas de renderizado, vaciado y stepper en 'Tu Pedido'
└── utils/
    └── whatsapp.test.js              # Pruebas del formateador de mensajes con y sin notas
```

**Structure Decision**: Modularización de componentes dedicados a la vista del carrito bajo `src/components/cart/`, manteniendo la arquitectura simple y desacoplada sin dependencias externas pesadas.

## Complexity Tracking

> **No se registran violaciones a la constitución.** Todas las decisiones se apegan a la solución más directa y mantenible.
