import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ProductCard } from '../../src/components/ProductCard';

const mockProduct = {
  id: 1,
  name: 'Nova Sonic Max',
  category: 'Audio',
  badge: 'Audio Pro',
  description: 'Cancelación activa',
  attribute: 'Stock listo',
  price: 199.00,
  imageUrl: 'https://example.com/audio.jpg',
};

describe('ProductCard Component', () => {
  it('renderiza la información completa del producto y el precio en Soles', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Nova Sonic Max')).toBeInTheDocument();
    expect(screen.getByText('Cancelación activa')).toBeInTheDocument();
    expect(screen.getByText('Audio Pro')).toBeInTheDocument();
    expect(screen.getByText('Stock listo')).toBeInTheDocument();
    expect(screen.getByText('S/ 199.00')).toBeInTheDocument();
  });

  it('permite incrementar y decrementar la cantidad con el stepper', () => {
    render(<ProductCard product={mockProduct} />);

    const plusBtn = screen.getByRole('button', { name: /Aumentar cantidad/i });
    const minusBtn = screen.getByRole('button', { name: /Disminuir cantidad/i });
    const counter = screen.getByTestId('qty-1');

    expect(counter).toHaveTextContent('1');

    fireEvent.click(plusBtn);
    expect(counter).toHaveTextContent('2');

    fireEvent.click(plusBtn);
    expect(counter).toHaveTextContent('3');

    fireEvent.click(minusBtn);
    expect(counter).toHaveTextContent('2');
  });

  it('no permite decrementar por debajo de 1 ni superar 99', () => {
    render(<ProductCard product={mockProduct} />);

    const minusBtn = screen.getByRole('button', { name: /Disminuir cantidad/i });
    const counter = screen.getByTestId('qty-1');

    expect(minusBtn).toBeDisabled();
    fireEvent.click(minusBtn);
    expect(counter).toHaveTextContent('1');
  });

  it('invoca onAddToCart con el producto y la cantidad seleccionada', () => {
    const handleAdd = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAdd} />);

    const plusBtn = screen.getByRole('button', { name: /Aumentar cantidad/i });
    const addBtn = screen.getByRole('button', { name: /Añadir/i });

    fireEvent.click(plusBtn); // qty = 2
    fireEvent.click(addBtn);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith(mockProduct, 2);
    expect(screen.getByText('Listo')).toBeInTheDocument();
  });
});

