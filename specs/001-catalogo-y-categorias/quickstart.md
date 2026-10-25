# Quickstart & Guía de Verificación: Módulo 001 - Catálogo y Categorías

**Feature**: `001-catalogo-y-categorias`  
**Objetivo**: Probar y verificar la funcionalidad completa en segundos directamente desde el navegador.  

---

## 1. Requisitos Previos

- Node.js 18.x o superior instalado.
- Navegador web moderno (Chrome, Edge, Firefox o Safari).

---

## 2. Puesta en Marcha en Local

Desde la raíz del repositorio `tienda-whatsapp/`, ejecutar los siguientes comandos:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo Vite
npm run dev
```

El servidor estará disponible de inmediato en la URL local (usualmente `http://localhost:5173`).

---

## 3. Escenarios de Verificación Rápida (Evaluador / Profesor)

### Escenario 1: Renderizado del Catálogo y Cuadrícula (10 segundos)
1. Abrir `http://localhost:5173` en el navegador.
2. Comprobar que el encabezado fijo muestra `NOVA STORE - Catálogo` y el ícono de `shopping_bag`.
3. Validar que se muestran las 6 tarjetas de producto en una cuadrícula de 2 columnas con sus títulos, descripciones, badges y precios en Soles (ej. `S/ 199.00`).
4. Verificar la tipografía Inter y los íconos Material Symbols correspondientes a la referencia de Stitch.

### Escenario 2: Filtrado por Categorías (5 segundos)
1. En el carrusel de categorías superior, pulsar sobre la píldora **'Audio'**.
2. Comprobar que la cuadrícula se filtra mostrando solo los 2 productos de audio: *Nova Sonic Max* y *Pebble 360 Audio*.
3. Pulsar sobre **'Wearables'** y comprobar que solo se muestra *Apex Horizon GPS*.
4. Pulsar sobre **'Todos'** y validar que reaparecen los 6 productos.

### Escenario 3: Stepper y Adición Reactiva al Carrito (10 segundos)
1. En la tarjeta de *Nova Sonic Max*, presionar el botón `+` para elevar la cantidad a `2`.
2. Presionar el botón `−` para reducirla a `1`, luego nuevamente `+` para dejarla en `2`.
3. Presionar el botón **'Añadir'**:
   - El botón cambia de inmediato a `'✓ Listo'` con fondo verde por 1 segundo.
   - El selector de la tarjeta se reinicia automáticamente a `1`.
   - El badge numérico en el encabezado se actualiza mostrando `2`.
   - Aparece en la parte inferior la barra flotante con el texto `2 productos • S/ 398.00`.

### Escenario 4: Persistencia en LocalStorage (5 segundos)
1. Con los productos agregados en el paso anterior, presionar `F5` o recargar la pestaña del navegador.
2. Comprobar que al reiniciar la página, el badge superior y la barra flotante conservan exactamente los `2 productos` y el total acumulado sin reiniciarse a cero.

### Escenario 5: Cajón Deslizable (Drawer) y Enlace de WhatsApp (10 segundos)
1. Hacer clic en el botón **'Ver Carro'** de la barra flotante (o en la pestaña 'Carrito' de la barra inferior).
2. Comprobar que se despliega el Drawer modal **'Tu Orden Actual'** listando los ítems, cantidades y el total en Soles (`S/ 398.00`).
3. Hacer clic en **'Confirmar Pedido vía WhatsApp'**:
   - Se abre una nueva pestaña del navegador apuntando a `https://wa.me/...` con el mensaje estructurado y codificado con el detalle del pedido.
   - El Drawer modal se cierra suavemente.

---

## 4. Comandos de Calidad y Compilación

```bash
# Validar pruebas unitarias y de componentes
npm test

# Validar compilación limpia para producción
npm run build
```

