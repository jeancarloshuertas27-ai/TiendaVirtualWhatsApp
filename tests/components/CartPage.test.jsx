import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../../src/App';
import { CartPage } from '../../src/components/cart/CartPage';
import { CartProvider } from '../../src/context/CartContext';
import { CART_STORAGE_KEY, WHATSAPP_PHONE_NUMBER } from '../../src/config/constants';

describe('CartPage & User Stories (Feature 002)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  const seedCart = (items) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  };

  const sampleItems = [
    {
      productId: 1,
      name: 'Nova Sonic Max',
      category: 'Audio',
      attribute: 'Stock listo',
      price: 199.00,
      quantity: 2,
      subtotal: 398.00,
      imageUrl: 'https://example.com/audio.jpg',
    },
    {
      productId: 2,
      name: 'Apex Horizon GPS',
      category: 'Wearables',
      attribute: '42mm',
      price: 149.50,
      quantity: 1,
      subtotal: 149.50,
      imageUrl: 'https://example.com/watch.jpg',
    },
  ];

  // ------------------------------------------------------------------------
  // US1: Navegación Bidireccional entre Catálogo y Carrito
  // ------------------------------------------------------------------------
  describe('US1: Navegación Bidireccional', () => {
    it('inicia en el catálogo y cambia a la vista Carrito al presionar el ícono superior o pestaña inferior', () => {
      seedCart(sampleItems);
      render(<App />);

      expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Catálogo');

      // Clic en el botón de carrito del encabezado
      const headerCartBtn = screen.getByRole('button', { name: /Carrito de compras/i });
      fireEvent.click(headerCartBtn);

      // Ahora estamos en la vista Carrito ('Tu Pedido')
      expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Carrito');
      expect(screen.getByText('Tu Pedido')).toBeInTheDocument();
      expect(screen.getByTestId('items-badge')).toHaveTextContent('3 artículos');

      // Regresar al catálogo usando el botón 'close' (X)
      const closeBtn = screen.getByRole('button', { name: /Volver al catálogo/i });
      fireEvent.click(closeBtn);

      expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Catálogo');
      expect(screen.queryByText('Tu Pedido')).not.toBeInTheDocument();

      // Probar navegación con la pestaña 'Carrito' de la barra inferior
      const bottomCartBtn = screen.getByRole('button', { name: /Abrir carrito/i });
      fireEvent.click(bottomCartBtn);

      expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Carrito');
      expect(screen.getByText('Tu Pedido')).toBeInTheDocument();

      // Regresar con la pestaña 'Catálogo' de la barra inferior
      const bottomCatalogBtn = screen.getByRole('button', { name: 'Catálogo' });
      fireEvent.click(bottomCatalogBtn);

      expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Catálogo');
    });

    it('navega a la vista Carrito al pulsar "Ver Carro" en la QuickOrderBar', () => {
      seedCart(sampleItems);
      render(<App />);

      const viewCartBtn = screen.getByRole('button', { name: /Ver Carro/i });
      fireEvent.click(viewCartBtn);

      expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Carrito');
      expect(screen.getByText('Tu Pedido')).toBeInTheDocument();
    });
  });

  // ------------------------------------------------------------------------
  // US2: Ajuste de Cantidades y Eliminación Individual
  // ------------------------------------------------------------------------
  describe('US2: Ajuste de Cantidades y Eliminación', () => {
    it('incrementa la cantidad con + y recalcula subtotales y total en Soles', () => {
      seedCart([sampleItems[0]]);
      render(
        <CartProvider>
          <CartPage />
        </CartProvider>
      );

      expect(screen.getByTestId('qty-1')).toHaveTextContent('2');
      expect(screen.getByTestId('subtotal-1')).toHaveTextContent('S/ 398.00');
      expect(screen.getByTestId('summary-total')).toHaveTextContent('S/ 398.00');

      const addBtn = screen.getByRole('button', { name: /Aumentar cantidad/i });
      fireEvent.click(addBtn);

      expect(screen.getByTestId('qty-1')).toHaveTextContent('3');
      expect(screen.getByTestId('subtotal-1')).toHaveTextContent('S/ 597.00');
      expect(screen.getByTestId('summary-total')).toHaveTextContent('S/ 597.00');
      expect(screen.getByTestId('items-badge')).toHaveTextContent('3 artículos');
    });

    it('decrementa la cantidad con − y recalcula subtotales en tiempo real', () => {
      seedCart([sampleItems[0]]);
      render(
        <CartProvider>
          <CartPage />
        </CartProvider>
      );

      const removeBtn = screen.getByRole('button', { name: /Disminuir cantidad/i });
      fireEvent.click(removeBtn);

      expect(screen.getByTestId('qty-1')).toHaveTextContent('1');
      expect(screen.getByTestId('subtotal-1')).toHaveTextContent('S/ 199.00');
      expect(screen.getByTestId('items-badge')).toHaveTextContent('1 artículo');
    });

    it('elimina el ítem si la cantidad es 1 y se presiona −', async () => {
      vi.useFakeTimers();
      seedCart([sampleItems[1]]); // quantity: 1
      render(
        <CartProvider>
          <CartPage />
        </CartProvider>
      );

      expect(screen.getByTestId('qty-2')).toHaveTextContent('1');
      const removeBtn = screen.getByRole('button', { name: /Disminuir cantidad/i });
      fireEvent.click(removeBtn);

      // Avanzar temporizador de la transición de salida
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.queryByTestId('cart-item-2')).not.toBeInTheDocument();
      vi.useRealTimers();
    });

    it('elimina un ítem específico al hacer clic en el botón de papelera', () => {
      vi.useFakeTimers();
      seedCart(sampleItems);
      render(
        <CartProvider>
          <CartPage />
        </CartProvider>
      );

      expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
      const trashBtn = screen.getByRole('button', { name: /Eliminar Nova Sonic Max/i });
      fireEvent.click(trashBtn);

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
      vi.useRealTimers();
    });
  });

  // ------------------------------------------------------------------------
  // US3: Manejo de Estado Vacío
  // ------------------------------------------------------------------------
  describe('US3: Manejo de Estado Vacío', () => {
    it('muestra la tarjeta de estado vacío cuando no hay ítems y deshabilita el botón de WhatsApp', () => {
      seedCart([]);
      render(
        <CartProvider>
          <CartPage />
        </CartProvider>
      );

      expect(screen.getByTestId('cart-empty-state')).toBeInTheDocument();
      expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
      expect(screen.queryByTestId('cart-list')).not.toBeInTheDocument();

      const whatsappBtn = screen.getByTestId('whatsapp-btn');
      expect(whatsappBtn).toBeDisabled();
      expect(whatsappBtn).toHaveClass('opacity-50');
      expect(whatsappBtn).toHaveClass('pointer-events-none');
    });

    it('permite regresar al catálogo al hacer clic en "Explorar Catálogo" desde el estado vacío', () => {
      seedCart([]);
      render(<App />);

      // Navegar a carrito
      const headerCartBtn = screen.getByRole('button', { name: /Carrito de compras/i });
      fireEvent.click(headerCartBtn);

      expect(screen.getByTestId('cart-empty-state')).toBeInTheDocument();

      // Clic en Explorar Catálogo
      const exploreBtn = screen.getByRole('button', { name: /Explorar Catálogo/i });
      fireEvent.click(exploreBtn);

      expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Catálogo');
      expect(screen.queryByTestId('cart-empty-state')).not.toBeInTheDocument();
    });
  });

  // ------------------------------------------------------------------------
  // US4: Notas de Entrega y Envío por WhatsApp
  // ------------------------------------------------------------------------
  describe('US4: Notas de Entrega y Envío por WhatsApp', () => {
    it('permite ingresar notas de entrega y genera la URL con encodeURIComponent al presionar checkout', () => {
      seedCart(sampleItems);
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});

      render(
        <CartProvider>
          <CartPage />
        </CartProvider>
      );

      const notesInput = screen.getByTestId('order-notes');
      fireEvent.change(notesInput, { target: { value: 'Timbre número 4, dejar en conserjería' } });
      expect(notesInput).toHaveValue('Timbre número 4, dejar en conserjería');

      const whatsappBtn = screen.getByTestId('whatsapp-btn');
      expect(whatsappBtn).not.toBeDisabled();
      fireEvent.click(whatsappBtn);

      expect(openSpy).toHaveBeenCalledTimes(1);
      const [url, target] = openSpy.mock.calls[0];
      expect(target).toBe('_blank');
      expect(url).toContain(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=`);

      const message = decodeURIComponent(url.split('?text=')[1]);
      expect(message).toContain('*¡Hola Nova Store! Quiero confirmar mi pedido:*');
      expect(message).toContain('• 2x Nova Sonic Max - S/ 398.00');
      expect(message).toContain('• 1x Apex Horizon GPS - S/ 149.50');
      expect(message).toContain('*Total a pagar:* S/ 547.50');
      expect(message).toContain('🚚 *Envío:* Gratis');
      expect(message).toContain('📝 *Notas:* Timbre número 4, dejar en conserjería');
      expect(message).toContain('Por favor confírmenme disponibilidad y datos de pago. ¡Gracias!');
    });

    it('omite la línea de notas cuando el comprador no ingresa texto', () => {
      seedCart(sampleItems);
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});

      render(
        <CartProvider>
          <CartPage />
        </CartProvider>
      );

      const whatsappBtn = screen.getByTestId('whatsapp-btn');
      fireEvent.click(whatsappBtn);

      expect(openSpy).toHaveBeenCalledTimes(1);
      const url = openSpy.mock.calls[0][0];
      const message = decodeURIComponent(url.split('?text=')[1]);

      expect(message).toContain('🚚 *Envío:* Gratis');
      expect(message).not.toContain('📝 *Notas:*');
    });
  });
});

