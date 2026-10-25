import React, { createContext, useState, useEffect } from 'react';
import { CART_STORAGE_KEY } from '../config/constants';

export const CartContext = createContext(null);

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(item => item && item.productId && item.quantity > 0);
    }
    return [];
  } catch (error) {
    console.error('Error al recuperar carrito desde localStorage:', error);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (_) {}
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error al guardar carrito en localStorage:', error);
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    if (!product || quantity <= 0) return;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.productId === product.id);

      if (existingIndex > -1) {
        const next = [...prevItems];
        const current = next[existingIndex];
        const newQty = Math.min(99, current.quantity + quantity);
        next[existingIndex] = {
          ...current,
          quantity: newQty,
          subtotal: current.price * newQty,
        };
        return next;
      }

      const safeQty = Math.min(99, Math.max(1, quantity));
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: safeQty,
        subtotal: product.price * safeQty,
      };
      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (productId, delta) => {
    setItems(prevItems => {
      return prevItems
        .map(item => {
          if (item.productId !== productId) return item;
          const newQty = item.quantity + delta;
          if (newQty < 1) return null;
          const boundedQty = Math.min(99, newQty);
          return {
            ...item,
            quantity: boundedQty,
            subtotal: item.price * boundedQty,
          };
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = items.reduce((acc, item) => acc + item.subtotal, 0);

  const value = {
    items,
    totalCount,
    totalAmount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

