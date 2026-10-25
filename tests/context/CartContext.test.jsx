import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '../../src/context/CartContext';
import { useCart } from '../../src/hooks/useCart';
import { CART_STORAGE_KEY } from '../../src/config/constants';

const mockProduct = {
  id: 1,
  name: 'Nova Sonic Max',
  price: 199.00,
  imageUrl: 'https://example.com/img.jpg',
  category: 'Audio',
  badge: 'Audio Pro'
};

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartContext & LocalStorage Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicia con un carrito vacío si no hay datos guardados', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.totalAmount).toBe(0);
  });

  it('agrega un producto correctamente y calcula el total', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].productId).toBe(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.items[0].subtotal).toBe(398.00);
    expect(result.current.totalCount).toBe(2);
    expect(result.current.totalAmount).toBe(398.00);
  });

  it('acumula cantidad si se agrega el mismo producto nuevamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1);
    });
    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalCount).toBe(3);
  });

  it('no permite exceder el tope máximo de 99 unidades', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 95);
    });
    act(() => {
      result.current.addToCart(mockProduct, 10);
    });

    expect(result.current.items[0].quantity).toBe(99);
  });

  it('elimina el producto si la cantidad se reduce por debajo de 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1);
    });
    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.updateQuantity(1, -1);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalCount).toBe(0);
  });

  it('persiste y recupera el carrito en localStorage', () => {
    const saved = [
      {
        productId: 2,
        name: 'Apex Horizon GPS',
        price: 149.50,
        imageUrl: 'https://example.com/img2.jpg',
        quantity: 1,
        subtotal: 149.50
      }
    ];
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(saved));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe('Apex Horizon GPS');
    expect(result.current.totalAmount).toBe(149.50);
  });

  it('se recupera de forma segura ante JSON corrupto en localStorage', () => {
    localStorage.setItem(CART_STORAGE_KEY, '{invalid-json');

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  it('permite actualizar deliveryNotes y conserva el estado en memoria durante la sesión', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.deliveryNotes).toBe('');
    act(() => {
      result.current.setDeliveryNotes('Timbre 4, dejar en recepción');
    });
    expect(result.current.deliveryNotes).toBe('Timbre 4, dejar en recepción');
  });

  it('permite alternar currentView entre catalogo y carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.currentView).toBe('catalogo');
    act(() => {
      result.current.setCurrentView('carrito');
    });
    expect(result.current.currentView).toBe('carrito');

    act(() => {
      result.current.setCurrentView('catalogo');
    });
    expect(result.current.currentView).toBe('catalogo');
  });
});
