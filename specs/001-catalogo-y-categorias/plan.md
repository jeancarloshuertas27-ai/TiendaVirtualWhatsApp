# Implementation Plan: Módulo 001 - Catálogo Interactivo de Productos y Adición al Carrito

**Branch**: `001-catalogo-y-categorias` | **Date**: 2026-10-25 | **Spec**: [specs/001-catalogo-y-categorias/spec.md](spec.md)

**Input**: Feature specification from `/specs/001-catalogo-y-categorias/spec.md`

## Summary

Implementar la vista principal responsiva de la tienda virtual **NOVA STORE** mediante una Single Page Application (SPA) construida en React con Vite y Tailwind CSS. El módulo comprende el renderizado de una cuadrícula de 2 columnas con los 6 productos de referencia de Stitch, un carrusel de filtrado por 5 categorías ('Todos', 'Audio', 'Wearables', 'Accesorios', 'Hogar'), controles interactivos de incremento/decremento (`+`/`−`) por tarjeta (rango 1-99), adición al carrito con microinteracción visual ('✓ Listo' por 1s), persistencia local en `localStorage`, barra flotante fija inferior (`quick-order-bar`) que resume ítems y total en Soles (S/), y un cajón deslizable modal (Drawer) 'Tu Orden Actual' con previsualización del pedido y enlace de confirmación directa a WhatsApp.

## Technical Context

**Language/Version**: JavaScript (ES2022+) / React 18+  
**Primary Dependencies**: React 18+, Vite 5+, Tailwind CSS 3+, Google Fonts (Inter), Google Material Symbols Outlined  
**Storage**: `localStorage` del navegador bajo la clave `"novastore_cart_v1"` con serialización JSON  
**Testing**: Vitest + React Testing Library para pruebas unitarias de componentes y estado  
**Target Platform**: Navegadores web modernos (Web Móvil prioritaria y adaptación a Escritorio)  
**Project Type**: Frontend Web Application (SPA ligera sin backend)  
**Performance Goals**: Tiempo de carga inicial < 1.0s, respuesta de filtrado de categorías < 100ms, microinteracción de adición reactiva instantánea  
**Constraints**: 
- Cero pasarelas de pago, cobros electrónicos ni pantallas de login obligatorio (estricta adherencia a la constitución).
- 100% fidelidad visual a las referencias en `stitch-referencias/vista_principal_del_cat_logo/code.html` y tokens de `modern_mobile_commerce/DESIGN.md`.
- Formato monetario invariable en Soles (`S/ [monto]`) e idioma español (Perú).  
**Scale/Scope**: Catálogo estático inicial de 6 productos, 5 categorías, persistencia de carrito en cliente.  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio Constitucional | Evaluación en el Plan | Estado |
|--------------------------|-----------------------|--------|
| **1. Simplicidad y fidelidad al alcance** | Aplicación React SPA pura sin backend, sin login obligatorio y sin pasarelas de pago. Derivación directa a WhatsApp mediante URL estructurada `wa.me`. | **PASS** |
| **2. Idioma y moneda** | Interfaz, mensajes y formato de pedido estrictamente en español de Perú. Moneda oficial fijada en Soles (`S/`). | **PASS** |
| **3. Cero alcance fantasma y fidelidad a Stitch** | Uso idéntico de tipografía Inter, íconos Material Symbols Outlined y paleta de colores de `DESIGN.md`. 6 productos idénticos a los del prototipo Stitch. | **PASS** |
| **4. Verificable por el profesor en segundos** | La aplicación arranca de inmediato con `npm run dev`, todas las funciones se prueban en navegador y persisten en `localStorage`. | **PASS** |
| **5. Código limpio y sin secretos** | Cero credenciales en repositorio. Número telefónico de WhatsApp centralizado en `src/config/constants.js`. | **PASS** |

*Resultado del Gate*: **APROBADO (5/5 principios cumplidos sin violaciones ni desvíos de complejidad).**

## Project Structure

### Documentation (this feature)

```text
specs/001-catalogo-y-categorias/
├── spec.md                  # Especificación formal de requisitos y casos de usuario
├── checklists/
│   └── requirements.md      # Validación de calidad de requisitos
├── plan.md                  # Este documento de planificación arquitectónica
├── research.md              # Decisiones técnicas y justificaciones arquitectónicas
├── data-model.md            # Entidades de datos, ciclo de vida y esquema localStorage
├── quickstart.md            # Guía rápida de ejecución y escenarios de verificación
└── contracts/
    ├── whatsapp-order-url.md # Contrato de URL y formato del mensaje para WhatsApp
    └── ui-components.md     # Contrato de interfaces de componentes React
```

### Source Code (repository root)

```text
index.html                     # Punto de entrada HTML con carga de Inter y Material Symbols
package.json                   # Dependencias (react, react-dom, vite, tailwindcss, vitest)
vite.config.js                 # Configuración de Vite
tailwind.config.js             # Tokens exactos de colors, fonts y spacing de DESIGN.md
postcss.config.js              # Configuración PostCSS para Tailwind
src/
├── main.jsx                   # Montaje de la aplicación React
├── App.jsx                    # Contenedor raíz con CartProvider y layout principal
├── index.css                  # Estilos base y directivas de Tailwind
├── config/
│   └── constants.js           # Número de WhatsApp y constantes globales de configuración
├── data/
│   └── products.json          # 6 productos del catálogo Stitch adaptados a Soles (S/)
├── context/
│   └── CartContext.jsx        # Proveedor de estado global del carrito con sincronización en localStorage
├── hooks/
│   └── useCart.js             # Hook de consumo ágil del contexto del carrito
├── components/
│   ├── Header.jsx             # Encabezado fijo con marca 'NOVA STORE - Catálogo' y badge reactivo
│   ├── CategoryPills.jsx      # Carrusel horizontal con 5 píldoras de filtrado
│   ├── AnnouncementBanner.jsx # Micro-banner "Envíos express prioritarios en 24h - GRATIS"
│   ├── ProductGrid.jsx        # Cuadrícula responsiva de 2 columnas
│   ├── ProductCard.jsx        # Tarjeta de producto con stepper (1-99) y botón 'Añadir' ('✓ Listo')
│   ├── QuickOrderBar.jsx      # Barra flotante fija inferior (visible si totalItems > 0)
│   ├── CartDrawer.jsx         # Modal deslizable inferior "Tu Orden Actual" y botón WhatsApp
│   └── BottomNav.jsx          # Barra de navegación inferior fija (Catálogo activo)
└── utils/
    ├── formatters.js          # Formateador de moneda en Soles ('S/ 0.00')
    └── whatsapp.js            # Constructor de URL segura para confirmación de pedido
tests/
├── setup.js                   # Configuración del entorno de pruebas Vitest + jsdom
├── context/
│   └── CartContext.test.jsx   # Pruebas de adición, cálculo y persistencia en localStorage
└── components/
    ├── ProductCard.test.jsx   # Pruebas del selector de cantidad y microinteracción '✓ Listo'
    └── CategoryPills.test.jsx # Pruebas de filtrado reactivo de categorías
```

**Structure Decision**: Aplicación web frontend unificada en la raíz (`src/`), modular y sin subcarpetas backend innecesarias, siguiendo fielmente las especificaciones de `AGENTS.md`.

## Complexity Tracking

> **No se registran violaciones a la constitución.** Todas las decisiones se apegan a la solución más simple, directa y mantenible (KISS).
