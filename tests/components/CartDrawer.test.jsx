import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartDrawer } from '../../src/components/CartDrawer';
import { QuickOrderBar } from '../../src/components/QuickOrderBar';

const mockItems = [
  {
    productId: 1,
    name: 'Nova Sonic Max',
    price: 199.00,
    quantity: 2,
    subtotal: 398.00,
    imageUrl: 'https://example.com/audio.jpg',
  },
];

describe('QuickOrderBar & CartDrawer Components', () => {
  it('QuickOrderBar no se muestra si totalItems es 0', () => {
    const { container } = render(
      <QuickOrderBar totalItems={0} totalAmount={0} onOpenDrawer={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('QuickOrderBar muestra la cantidad y total en Soles cuando hay productos', () => {
    const handleOpen = vi.fn();
    render(
      <QuickOrderBar totalItems={2} totalAmount={398.00} onOpenDrawer={handleOpen} />
    );

    expect(screen.getByText('2 productos')).toBeInTheDocument();
    expect(screen.getByText('S/ 398.00')).toBeInTheDocument();

    const openBtn = screen.getByRole('button', { name: /Ver Carro/i });
    fireEvent.click(openBtn);
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it('CartDrawer no se muestra cuando isOpen es false', () => {
    const { container } = render(
      <CartDrawer
        isOpen={false}
        onClose={() => {}}
        items={mockItems}
        totalAmount={398.00}
        onCheckoutWhatsApp={() => {}}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('CartDrawer muestra los productos y el botón de WhatsApp cuando isOpen es true', () => {
    const handleClose = vi.fn();
    const handleWhatsApp = vi.fn();

    render(
      <CartDrawer
        isOpen={true}
        onClose={handleClose}
        items={mockItems}
        totalAmount={398.00}
        onCheckoutWhatsApp={handleWhatsApp}
      />
    );

    expect(screen.getByText('Tu Orden Actual')).toBeInTheDocument();
    expect(screen.getByText('Nova Sonic Max')).toBeInTheDocument();
    expect(screen.getByText('2 unidades')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-total')).toHaveTextContent('S/ 398.00');

    const whatsappBtn = screen.getByRole('button', { name: /Confirmar Pedido vía WhatsApp/i });
    fireEvent.click(whatsappBtn);
    expect(handleWhatsApp).toHaveBeenCalledTimes(1);

    const closeBtn = screen.getByRole('button', { name: /Cerrar resumen/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

