# Contratos de Componentes UI: Módulo 002 - Vista de Carrito y Checkout

**Feature**: `002-carrito-y-pedidos-whatsapp`  
**Arquitectura**: React Component Hierarchy  
**Status**: Formal  

---

## 1. Jerarquía de Componentes de la Vista 'Tu Pedido'

```text
App (CartProvider)
├── Header (marca, subtítulo "Carrito" cuando currentView === 'carrito')
├── Main
│   ├── [Vista Catálogo (Módulo 001)]
│   └── CartPage (vista Módulo 002)
│       ├── CartHeader ("Tu Pedido", badge "{count} artículos", botón 'close' X)
│       ├── FreeShippingTracker ("¡Genial! Calificas para Envío Gratis", barra 100%)
│       ├── CartItemList (lista de productos en el carrito)
│       │   └── CartItemRow (miniatura, título, papelera, stepper −/+, subtotal)
│       ├── CartEmptyState (cesta vacía, 'Explorar Catálogo')
│       ├── DeliveryNotesInput (campo de notas con ícono chat_bubble_outline)
│       └── OrderSummaryPanel (Subtotal, Envío GRATIS, Total, botón WhatsApp, trust badges)
└── BottomNav (Catálogo, Carrito [activo], Pedidos, Perfil)
```

---

## 2. Contratos de Propiedades (Props)

### 2.1. `CartHeader`
- `itemsCount: number`: Total de artículos en la orden.
- `onClose: () => void`: Retorna a la vista `'catalogo'`.

### 2.2. `CartItemRow`
- `item: CartItem`: Objeto con `productId`, `name`, `price`, `quantity`, `subtotal`, `imageUrl`.
- `onUpdateQuantity: (productId: number, delta: number) => void`: Decrementa o incrementa.
- `onRemove: (productId: number) => void`: Remueve el ítem.

### 2.3. `CartEmptyState`
- `onExploreCatalog: () => void`: Cambia `currentView` a `'catalogo'`.

### 2.4. `DeliveryNotesInput`
- `notes: string`: Valor controlado.
- `onChange: (notes: string) => void`: Setter reactivo.

### 2.5. `OrderSummaryPanel`
- `subtotal: number`: Monto antes de envío.
- `total: number`: Monto total a pagar.
- `hasItems: boolean`: Habilita o deshabilita el botón de WhatsApp.
- `onCheckoutWhatsApp: () => void`: Dispara la apertura del enlace wa.me.

