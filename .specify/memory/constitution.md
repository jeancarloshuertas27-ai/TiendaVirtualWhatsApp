<!--
Sync Impact Report:
- Version change: Unversioned draft → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → I. Simplicidad y Fidelidad al Alcance
  - [PRINCIPLE_2_NAME] → II. Idioma y Moneda (Localización Perú)
  - [PRINCIPLE_3_NAME] → III. Cero Alcance Fantasma y Fidelidad Visual a Stitch
  - [PRINCIPLE_4_NAME] → IV. Verificabilidad Inmediata y Persistencia Local
  - [PRINCIPLE_5_NAME] → V. Código Limpio y Sin Secretos
- Added sections:
  - Restricciones Técnicas y Estándares (SECTION_2_NAME)
  - Criterios de Calidad y Verificación (SECTION_3_NAME)
  - Governance (Reglas de gobernanza, enmienda y cumplimiento)
- Removed sections: Ninguna (plantilla inicial completada).
- Follow-up TODOs: Ninguno. Todos los placeholders han sido definidos concretamente.
-->

# NovaStore Constitution

## Core Principles

### I. Simplicidad y Fidelidad al Alcance
El sistema DEBE concebirse estrictamente como un catálogo interactivo ligero y directo que permita explorar productos, modificar cantidades (+/-), añadir y quitar ítems del carrito de compras, y derivar el pedido final hacia WhatsApp mediante un enlace preformateado (`https://wa.me/`). Se DEBE elegir siempre la solución arquitectónica y técnica más simple y mantenible (KISS / YAGNI). Queda terminantemente prohibido incorporar pasarelas de pago externas, cobros con tarjeta o flujos transaccionales bancarios.

### II. Idioma y Moneda (Localización Perú)
Toda la interfaz de usuario, etiquetas, mensajes de retroalimentación, estados vacíos, diálogos y el texto estructurado del pedido para WhatsApp DEBEN estar en español de Perú. La moneda oficial y única es el Sol, expresada y formateada invariablemente como `S/ [monto]` (por ejemplo: `S/ 120.00`). Todo cálculo de subtotal y total DEBE reflejarse de forma consistente bajo esta denominación.

### III. Cero Alcance Fantasma y Fidelidad Visual a Stitch
El desarrollo DEBE respetar al 100% las especificaciones visuales provistas en las carpetas de referencia dentro de `stitch-referencias/` (`vista_principal_del_cat_logo`, `panel_del_carrito_y_confirmaci_n` y tokens de `modern_mobile_commerce/DESIGN.md`). Esto incluye la tipografía Inter, íconos de Material Symbols y la paleta de colores oficial (superficies `#f7f9fb`, fondos, texto primario `#191c1e` y acentos verde `#006d2f`). Se PROHÍBE explícitamente inventar pantallas de autenticación obligatoria (login), pasarelas de pago o paneles de administración que no formen parte de la especificación acordada.

### IV. Verificabilidad Inmediata y Persistencia Local
Cualquier evaluador o docente DEBE poder comprobar la funcionalidad integral del sistema en cuestión de segundos directamente desde el navegador web. Todos los flujos clave (filtrado por categorías, búsqueda de productos, incremento y decremento de unidades con `+` y `-`, adición al carrito, eliminación de ítems mediante el ícono de papelera, visualización del estado de carrito vacío y generación del enlace de WhatsApp con el mensaje pre-armado) DEBEN ser inmediatamente funcionales y persistir su estado en `localStorage` ante recargas de página.

### V. Código Limpio y Sin Secretos
El repositorio NO DEBE almacenar claves privadas, credenciales de API ni tokens confidenciales. El número de teléfono de destino para la recepción de pedidos en WhatsApp DEBE estar centralizado y configurado en una constante clara y visible (ejemplo: `WHATSAPP_PHONE_NUMBER = "519XXXXXXXX"`), permitiendo su modificación inmediata sin alterar la lógica de negocio. El código DEBE ser modular, semántico y legible.

## Restricciones Técnicas y Estándares

- **Pila Tecnológica**: Aplicación web frontend moderna y responsiva (HTML5 semántico, CSS3 estructurado según tokens de Stitch y JavaScript/TypeScript modular sin dependencias innecesarias).
- **Almacenamiento Local**: El carrito de compras y las preferencias temporales de usuario DEBEN gestionarse en `localStorage` con serialización JSON tolerante a errores.
- **Integración con WhatsApp**: El enlace de redirección DEBE construirse mediante la API estándar de WhatsApp Web/móvil (`https://wa.me/{numero}?text={mensaje_codificado}`), utilizando `encodeURIComponent` y formato de mensaje limpio y ordenado con detalle de ítems, cantidades, precios unitarios y total general.
- **Diseño Responsivo**: La experiencia DEBE estar optimizada para dispositivos móviles y adaptarse con naturalidad a pantallas de escritorio, cumpliendo con la fidelidad de diseño de las referencias de Stitch.

## Criterios de Calidad y Verificación

- **Inspección Visual**: Validación contra los archivos de diseño y HTML de referencia en `stitch-referencias/` para asegurar correspondencia exacta en tipografía Inter, iconografía Material Symbols, espaciado y contraste cromático.
- **Flujo de Evaluación Directa**: Verificación de ciclo completo en navegador sin dependencias de backend complejas:
  1. Selección y filtrado de catálogo.
  2. Gestión de carrito reactiva (adición, cantidades, eliminación reactiva).
  3. Persistencia en `localStorage` tras recargar la pestaña.
  4. Clic en "Confirmar pedido" que abre la URL de WhatsApp con el mensaje estructurado correcto.
- **Higiene del Repositorio**: Revisión estricta mediante control de versiones para evitar filtración de secretos o archivos temporales innecesarios.

## Governance

- **Supremacía Constitucional**: Esta constitución prevalece sobre cualquier decisión técnica o sugerencia ad-hoc. Todo código, especificación o plan generado para NovaStore DEBE alinearse con estos principios.
- **Control de Alcance**: Cualquier solicitud o componente que introduzca alcance fantasma (login obligatorio, pasarelas de pago o complejidad innecesaria) queda automáticamente rechazado.
- **Procedimiento de Enmienda**: Las modificaciones a este documento requieren una justificación explícita, consenso en la especificación y actualización de `.specify/memory/constitution.md` con un incremento semántico de versión.
- **Política de Versionado Semántico**:
  - **MAJOR**: Modificaciones que cambien o remuevan principios fundamentales o modifiquen drásticamente el alcance rector.
  - **MINOR**: Incorporación de nuevos principios, secciones o restricciones técnicas materiales.
  - **PATCH**: Correcciones ortográficas, ajustes de redacción o refinamientos no semánticos.
- **Revisión de Cumplimiento**: Toda entrega, revisión o pull request DEBE verificar el estricto cumplimiento de los 5 principios básicos y las restricciones establecidas.

**Version**: 1.0.0 | **Ratified**: 2026-10-25 | **Last Amended**: 2026-10-25
