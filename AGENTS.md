# AGENTS.md — Memoria Técnica

## 1. Aplicación
**Nova Store - Tienda Virtual con Pedidos por WhatsApp**: Catálogo interactivo donde el usuario explora productos por categoría, selecciona cantidades, agrega o quita productos del carrito sin pasarela de pagos y envía su orden estructurada vía WhatsApp, siguiendo fielmente los archivos `code.html`, `screen.png` y `DESIGN.md` ubicados en la carpeta `stitch-referencias/`.

## 2. Stack Tecnológico
- **Frontend**: Aplicación en React con Vite y Tailwind CSS.
- **Diseño & UI**: Colores y fuentes exactos de `stitch-referencias/modern_mobile_commerce/DESIGN.md` (tipografía Inter) y `Material Symbols Outlined`.
- **Datos & Persistencia**: Catálogo de datos en archivo JSON local y persistencia del carrito de compras en `localStorage`.
- **Integración**: Generación de URL de WhatsApp (`wa.me`) con mensaje estructurado.

## 3. Ejecución y Pruebas en Local
- `npm install`: Instala las dependencias del proyecto.
- `npm run dev`: Inicia el servidor de desarrollo local.
- `npm test`: Ejecuta la suite de pruebas unitarias y de componentes.
- `npm run build`: Compila la aplicación y valida tipos para producción.

## 4. Convenciones
- Código limpio, modular, sin claves privadas ni secretos en el repositorio; número de WhatsApp centralizado en una constante clara.
- Fidelidad visual total a Stitch y cero alcance fantasma (sin logins obligatorios ni pasarelas de pago).
- **Regla de cierre de feature**: Cuando te pida "cerrar la feature", ejecuta: verificar el working tree y commitear los cambios pendientes; correr tests o build de verificación (parar si fallan); hacer checkout de main; fusionar la rama de la feature con --no-ff y el mensaje "Merge feature NNN: <nombre>"; borrar la rama local y la rama remota correspondiente; subir main al remoto; y mostrar git log --oneline --graph -10. Si el push falla, informar el error y dejar claro qué pasos sí se completaron.

Las reglas de producto viven en .specify/memory/constitution.md y el estado del producto en specs/README.md

