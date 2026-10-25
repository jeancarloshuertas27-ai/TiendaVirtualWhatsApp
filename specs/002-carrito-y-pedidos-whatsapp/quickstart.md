# Quickstart & Guía de Verificación: Módulo 002 - Carrito Completo y Pedidos WhatsApp

**Feature**: `002-carrito-y-pedidos-whatsapp`  
**Objetivo**: Verificar el flujo completo de revisión, vaciado, notas y checkout en segundos directamente en el navegador.  

---

## 1. Puesta en Marcha en Local

```bash
# 1. Asegurar dependencias instaladas
npm install

# 2. Levantar servidor local
npm run dev
```

Acceder a `http://localhost:5173`.

---

## 2. Escenarios de Verificación Rápida

### Escenario 1: Navegación a 'Tu Pedido' (5 segundos)
1. Con al menos un producto añadido, pulsar el ícono de bolsa del encabezado o la pestaña 'Carrito' en la barra inferior.
2. Validar que la vista cambia a 'Tu Pedido', mostrando el encabezado contextual, el botón 'X', el badge de artículos y la lista de productos agregados.
3. Presionar el botón redondo 'X' y validar el retorno inmediato al catálogo.

### Escenario 2: Modificación de Cantidad y Eliminación (10 segundos)
1. En 'Tu Pedido', presionar `+` en un producto para incrementar la cantidad; validar que su subtotal y el total a pagar se incrementan al instante.
2. Presionar el botón `−` hasta llegar a 1, y presionarlo una vez más: comprobar que el ítem se elimina de la lista.
3. En otro ítem, pulsar el ícono de papelera (`delete`): comprobar que se remueve de inmediato y el badge de artículos se reduce.

### Escenario 3: Estado Vacío 'Tu carrito está vacío' (5 segundos)
1. Eliminar todos los productos hasta dejar el carrito en 0.
2. Comprobar que la lista desaparece y se despliega la tarjeta con el ícono `shopping_basket` y el título "Tu carrito está vacío".
3. Validar que el botón verde de WhatsApp se muestra deshabilitado (`opacity-50 pointer-events-none`).
4. Pulsar el botón **'Explorar Catálogo'**: comprobar que se regresa al catálogo principal de productos.

### Escenario 4: Notas de Entrega y Envío por WhatsApp (10 segundos)
1. Añadir 1 o 2 productos desde el catálogo e ingresar a 'Tu Pedido'.
2. En el campo "Notas para la entrega (opcional)", escribir: `Timbre número 4, dejar en conserjería`.
3. Hacer clic en **'Enviar pedido por WhatsApp'**:
   - Se abre una nueva pestaña del navegador hacia `https://wa.me/51999999999?text=...`.
   - El mensaje incluye el saludo, la lista de ítems en Soles, el total a pagar, envío gratis y la línea `📝 *Notas:* Timbre número 4, dejar en conserjería`.
4. Borrar la nota y pulsar nuevamente el botón de WhatsApp: validar que el mensaje se genera omitiendo la línea de notas.

---

## 3. Pruebas Automatizadas y Compilación

```bash
# Ejecutar suite de pruebas
npm test

# Validar compilación limpia para producción
npm run build
```

