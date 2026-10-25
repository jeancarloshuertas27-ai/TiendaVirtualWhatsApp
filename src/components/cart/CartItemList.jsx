import React from 'react';
import { CartItemRow } from './CartItemRow';

/**
 * Contenedor de lista de productos en 'Tu Pedido'
 * @param {{
 *   items: Array<any>,
 *   onUpdateQuantity: (productId: number, delta: number) => void,
 *   onRemove: (productId: number) => void
 * }} props
 */
export function CartItemList({ items = [], onUpdateQuantity, onRemove }) {
  return (
    <div className="flex flex-col gap-y-3" data-testid="cart-list" id="cart-list">
      {items.map(item => (
        <CartItemRow
          key={item.productId}
          item={item}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  );
}

