import React from 'react';
import { ProductCard } from './ProductCard';
import { useCart } from '../hooks/useCart';

export function ProductGrid({ products }) {
  const { addToCart } = useCart();

  if (!products || products.length === 0) {
    return (
      <div className="px-margin py-12 text-center text-on-surface-variant font-body-md">
        No se encontraron productos en esta categoría.
      </div>
    );
  }

  return (
    <div className="px-margin grid grid-cols-2 gap-gutter-sm" data-testid="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
}

