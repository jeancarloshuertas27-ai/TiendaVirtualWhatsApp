import React, { useState } from 'react';
import { formatPrice } from '../../utils/formatters';

/**
 * Fila individual de producto en la vista 'Tu Pedido'
 * @param {{
 *   item: {
 *     productId: number,
 *     name: string,
 *     attribute?: string,
 *     price: number,
 *     imageUrl: string,
 *     quantity: number,
 *     subtotal: number
 *   },
 *   onUpdateQuantity: (productId: number, delta: number) => void,
 *   onRemove: (productId: number) => void
 * }} props
 */
export function CartItemRow({ item, onUpdateQuantity, onRemove }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item.productId);
    }, 180);
  };

  const handleDecrement = () => {
    if (item.quantity <= 1) {
      handleRemove();
    } else {
      onUpdateQuantity(item.productId, -1);
    }
  };

  const handleIncrement = () => {
    if (item.quantity < 99) {
      onUpdateQuantity(item.productId, 1);
    }
  };

  return (
    <div
      className={`cart-item relative p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex gap-space-sm items-center transition-all duration-200 ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      data-price={item.price}
      data-testid={`cart-item-${item.productId}`}
      id={`cart-item-${item.productId}`}
    >
      <div className="w-20 h-20 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0 relative">
        <img
          alt={item.name}
          className="w-full h-full object-cover"
          src={item.imageUrl}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 pr-1">
        <div className="flex items-start justify-between gap-1">
          <p className="font-title-md text-title-md text-on-surface truncate">
            {item.name}
          </p>
          <button
            aria-label={`Eliminar ${item.name}`}
            className="text-on-surface-variant hover:text-error transition-colors p-1 flex-shrink-0 cursor-pointer"
            onClick={handleRemove}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>

        {item.attribute && (
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {item.attribute}
          </span>
        )}

        <div className="flex items-center justify-between mt-2">
          {/* Stepper Counter */}
          <div className="flex items-center bg-surface-container-low rounded-full px-1 py-0.5 shadow-inner">
            <button
              aria-label="Disminuir cantidad"
              className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface hover:bg-surface-container shadow-sm transition-transform active:scale-95 cursor-pointer"
              onClick={handleDecrement}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span
              className="qty-display font-label-md text-label-md text-on-surface min-w-[28px] text-center font-bold"
              data-testid={`qty-${item.productId}`}
            >
              {item.quantity}
            </span>
            <button
              aria-label="Aumentar cantidad"
              className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface hover:bg-surface-container shadow-sm transition-transform active:scale-95 cursor-pointer"
              onClick={handleIncrement}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>

          {/* Item Subtotal */}
          <span
            className="item-subtotal font-price-md text-price-md text-on-surface font-bold"
            data-testid={`subtotal-${item.productId}`}
          >
            {formatPrice(item.subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

