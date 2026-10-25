# Research & Architecture Decisions: Módulo 001 - Catálogo Interactivo y Adición al Carrito

**Feature**: `001-catalogo-y-categorias`  
**Date**: 2026-10-25  
**Status**: Completed  

---

## 1. Frontend Framework & Build Tool

- **Decision**: React 18+ con Vite como bundler y entorno de desarrollo.
- **Rationale**: 
  - Inicio de servidor local en milisegundos y HMR instantáneo para iterar rápidamente sobre la UI.
  - Sincronización reactiva del estado del carrito entre múltiples componentes desacoplados (encabezado, tarjetas de producto, barra flotante inferior, drawer modal).
  - Cumple estrictamente con la memoria técnica en `AGENTS.md`.
- **Alternatives Considered**:
  - *Next.js*: Rechazado por complejidad innecesaria de SSR/rutas del servidor y mayor huella de dependencias, violando el Principio 1 (Simplicidad y KISS).
  - *Vanilla JavaScript (sin framework)*: Rechazado porque la sincronización de estado entre componentes y el manejo de persistencia se vuelven frágiles y propensos a desincronizaciones DOM al escalar a la vista completa del carrito (Módulo 002).

---

## 2. Sistema de Estilos y Fidelidad Visual a Stitch

- **Decision**: Tailwind CSS configurado con los tokens semánticos exactos de `stitch-referencias/modern_mobile_commerce/DESIGN.md`, tipografía Inter y Material Symbols Outlined.
- **Rationale**: 
  - `stitch-referencias/vista_principal_del_cat_logo/code.html` utiliza clases de utilidad personalizadas (`bg-surface`, `text-on-surface`, `bg-secondary`, `font-headline-sm`, `p-space-sm`, `gap-gutter-sm`).
  - Configurar estos colores, espaciados y tipografías en `tailwind.config.js` permite copiar y renderizar la estructura HTML de Stitch con 100% de fidelidad visual y cero desvíos.
- **Alternatives Considered**:
  - *CSS puro / manual*: Rechazado por riesgo de inconsistencias cromáticas y dificultad para mantener tokens de diseño (más de 30 variables de color).
  - *Librerías de componentes (MUI, Chakra, Shadcn)*: Rechazadas porque imponen sus propios estilos y rompen la fidelidad pixel-perfect con el prototipo de Stitch.

---

## 3. Gestión de Estado y Persistencia

- **Decision**: Contexto de React (`CartContext`) con hook personalizado `useCart`, respaldado automáticamente por `localStorage` con clave `novastore_cart_v1`.
- **Rationale**: 
  - Permite a cualquier componente leer o mutar el carrito (`addToCart`, `updateQuantity`, `removeFromCart`, `cartItems`, `totalCount`, `totalAmount`) sin prop-drilling.
  - La serialización a JSON se encapsula con manejo seguro de errores (`try/catch`) para evitar fallos si el almacenamiento del navegador está dañado o deshabilitado.
  - Cumple el Principio 4 de la constitución (persistencia y verificación en segundos por el profesor).
- **Alternatives Considered**:
  - *Zustand / Redux Toolkit*: Rechazados para no inflar dependencias externas en un alcance tan conciso y bien delimitado.

---

## 4. Estructura y Origen de Datos del Catálogo

- **Decision**: Archivo JSON estático local (`src/data/products.json`) tipado y exportado como constante en el cliente.
- **Rationale**: 
  - Cero dependencias de servicios externos o bases de datos que puedan fallar durante la evaluación.
  - Los 6 productos oficiales del prototipo Stitch se mantienen con sus identificadores, categorías, imágenes de Google Cloud Storage y descripciones, adaptando los precios a Soles (`S/`).
- **Alternatives Considered**:
  - *Mock Server (JSON-Server / MSW)*: Rechazado porque requeriría ejecutar procesos adicionales en segundo plano, complicando el arranque con `npm run dev`.

---

## 5. Integración con WhatsApp y Seguridad

- **Decision**: Módulo utilitario (`src/utils/whatsapp.js`) que construye URLs seguras codificadas (`https://wa.me/{phone}?text={encodedText}`) utilizando una constante centralizada `WHATSAPP_PHONE_NUMBER` alojada en `src/config/constants.js`.
- **Rationale**: 
  - Cumple estrictamente con el Principio 5 de la constitución (código limpio, cero secretos en el repositorio, número configurable en un único punto).
  - El formato del mensaje estructurado se alinea con el dialecto de español de Perú y la moneda oficial (`S/`).
- **Alternatives Considered**:
  - *Llamadas a la API oficial de WhatsApp Cloud*: Rechazadas porque requerirían tokens de Meta, servidores backend y pasarelas, lo cual está explícitamente prohibido por la constitución.

