# Data Model: Módulo 002 - Gestión Completa del Carrito y Checkout vía WhatsApp

**Feature**: `002-carrito-y-pedidos-whatsapp`  
**Date**: 2026-10-25  
**Status**: Completed  

---

## 1. Diagrama de Clases y Entidades

```mermaid
classDiagram
    class CartItem {
        +number productId
        +string name
        +string attribute
        +number price
        +string imageUrl
        +number quantity
        +number subtotal
    }

    class CartContextState {
        +CartItem[] items
        +number totalCount
        +number totalAmount
        +string deliveryNotes
        +string currentView
        +addToCart(product, quantity)
        +updateQuantity(productId, delta)
        +removeFromCart(productId)
        +clearCart()
        +setDeliveryNotes(notes)
        +setCurrentView(view)
    }

    CartContextState "1" *-- "0..*" CartItem : gestiona
```

---

## 2. Definición Detallada de Campos

### 2.1. CartItem (Ítem en el Carrito)
| Campo | Tipo | Requerido | Descripción | Regla de Validación |
|-------|------|-----------|-------------|---------------------|
| `productId` | `number` | Sí | Identificador único del producto | Entero positivo |
| `name` | `string` | Sí | Nombre comercial del producto | No vacío |
| `attribute` | `string` | No | Subtítulo descriptivo o categoría | Texto corto |
| `price` | `number` | Sí | Precio unitario en Soles | Positivo (`price >= 0`) |
| `imageUrl` | `string` | Sí | URL de la miniatura | URL válida de Stitch |
| `quantity` | `number` | Sí | Cantidad seleccionada | Rango `[1, 99]`. Si `delta < 1`, se elimina. |
| `subtotal` | `number` | Sí | Monto calculado | `price * quantity` |

### 2.2. CartContextState (Estado Global Ampliado)
| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `items` | `CartItem[]` | Colección de productos seleccionados |
| `totalCount` | `number` | Total de unidades (`Σ quantity`) |
| `totalAmount` | `number` | Total monetario en Soles (`Σ subtotal`) |
| `deliveryNotes` | `string` | Instrucciones opcionales del cliente |
| `currentView` | `'catalogo' \| 'carrito'` | Vista activa en la interfaz de usuario |

---

## 3. Máquina de Estados del Carrito en 'Tu Pedido'

```mermaid
stateDiagram-v2
    [*] --> CarritoConProductos : items.length > 0
    [*] --> CarritoVacio : items.length == 0

    state CarritoConProductos {
        ListaProductos : Muestra lista con stepper y papelera
        TrackerEnvio : Muestra barra de progreso 100% Gratis
        CampoNotas : Entrada de texto activa
        BotonWhatsApp : Botón verde habilitado
    }

    state CarritoVacio {
        EstadoVacio : Muestra 'Tu carrito está vacío'
        BotonExplorar : Botón 'Explorar Catálogo' (vuelve a catálogo)
        BotonWhatsAppDeshabilitado : Botón WhatsApp con opacidad 50% e inerte
    }

    CarritoConProductos --> CarritoConProductos : updateQuantity / eliminar ítem (quedan >= 1)
    CarritoConProductos --> CarritoVacio : eliminar último ítem
    CarritoVacio --> CarritoConProductos : añadir producto desde catálogo
```

