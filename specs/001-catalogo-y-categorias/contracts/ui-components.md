# Contrato de Componentes UI: Módulo 001 - Catálogo y Categorías

**Feature**: `001-catalogo-y-categorias`  
**Arquitectura**: React Component Hierarchy  
**Status**: Formal  

---

## 1. Jerarquía de Componentes

```text
App (CartProvider)
├── Header (marca, badge de shopping_bag)
├── Main
│   ├── CategoryPills (carrusel de 5 filtros)
│   ├── AnnouncementBanner ("Envíos express en 24h...")
│   └── ProductGrid (cuadrícula 2 columnas)
│       └── ProductCard (x6, stepper, botón 'Añadir' con microinteracción '✓ Listo')
├── QuickOrderBar (barra flotante inferior fija, visible si totalItems > 0)
├── CartDrawer (modal deslizable "Tu Orden Actual" con resumen y botón WhatsApp)
└── BottomNav (4 pestañas: Catálogo activo, Carrito, Pedidos, Perfil)
```

---

## 2. Contratos de Propiedades (Props & Interfaces)

### 2.1. `ProductCard`
Componente atómico que representa una tarjeta de la cuadrícula.
- **Props**:
  - `product: Product`: Objeto completo con los datos del producto.
  - `onAddToCart: (product: Product, quantity: number) => void`: Callback invocado al pulsar el botón 'Añadir'.
- **Estado Local Interno**:
  - `quantity: number`: Cantidad seleccionada en el stepper local (mínimo 1, máximo 99; reiniciado a 1 tras añadir).
  - `isAdded: boolean`: Flag para mostrar el estado `'✓ Listo'` durante 1.0 - 1.2 segundos.

### 2.2. `CategoryPills`
Carrusel horizontal para el filtrado de categorías.
- **Props**:
  - `categories: string[]`: Lista de nombres (`["Todos", "Audio", "Wearables", "Accesorios", "Hogar"]`).
  - `activeCategory: string`: Categoría actualmente seleccionada.
  - `onSelectCategory: (category: string) => void`: Callback al hacer clic en una píldora.

### 2.3. `QuickOrderBar`
Barra fija flotante que resume la orden y da acceso al Drawer.
- **Props**:
  - `totalItems: number`: Cantidad consolidada de unidades.
  - `totalAmount: number`: Monto monetario total en Soles.
  - `onOpenDrawer: () => void`: Función para abrir el Drawer modal.
- **Regla de Renderizado**: Se renderiza con transición si `totalItems > 0`; oculta si `totalItems === 0`.

### 2.4. `CartDrawer`
Cajón modal deslizable desde la parte inferior.
- **Props**:
  - `isOpen: boolean`: Control de visibilidad y animación.
  - `onClose: () => void`: Cierre del drawer (botón 'close' o backdrop).
  - `items: CartItem[]`: Artículos de la orden.
  - `totalAmount: number`: Total acumulado.
  - `onCheckoutWhatsApp: () => void`: Desencadena la generación de URL y apertura de WhatsApp.

### 2.5. `Header` & `BottomNav`
- `Header`: Muestra el logo, título "NOVA STORE - Catálogo", y badge numérico reactivo sobre el ícono `shopping_bag`.
- `BottomNav`: Muestra las 4 pestañas de navegación con `Catálogo` destacado como activo.

