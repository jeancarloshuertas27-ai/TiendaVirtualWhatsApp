import React, { useState } from 'react';
import { formatPrice } from '../utils/formatters';

export function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleMinus = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handlePlus = (e) => {
    e.stopPropagation();
    if (quantity < 99) {
      setQuantity(q => q + 1);
    }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (isAdded) return;

    if (onAddToCart) {
      onAddToCart(product, quantity);
    }

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 1100);
  };

  return (
    <div
      className="product-card flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm transition-all duration-200"
      data-id={product.id}
      data-price={product.price}
    >
      <div className="relative w-full aspect-square bg-surface-container-low overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-highest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface-variant">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-space-sm flex flex-col flex-1 justify-between gap-space-xs">
        <div>
          <h3 className="font-title-md text-title-md text-on-surface line-clamp-1 leading-tight">
            {product.name}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            {product.description}
          </p>
        </div>

        <div className="flex items-baseline justify-between mt-space-xs">
          <span className="font-price-md text-price-md text-on-surface">
            {formatPrice(product.price)}
          </span>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">
            {product.attribute}
          </span>
        </div>

        {/* Stepper & Rapid Add */}
        <div className="flex items-center gap-1.5 mt-space-xs pt-space-xs">
          <div className="flex items-center justify-between bg-surface-container rounded-full h-9 px-1 w-[82px] flex-shrink-0">
            <button
              className="btn-minus w-7 h-7 rounded-full flex items-center justify-center text-on-surface active:bg-surface active:scale-90 transition-all text-[16px] font-bold select-none disabled:opacity-50"
              type="button"
              onClick={handleMinus}
              disabled={quantity <= 1}
              aria-label={`Disminuir cantidad de ${product.name}`}
            >
              −
            </button>
            <span
              className="qty-counter font-label-md text-label-md text-on-surface font-semibold select-none"
              data-testid={`qty-${product.id}`}
            >
              {quantity}
            </span>
            <button
              className="btn-plus w-7 h-7 rounded-full flex items-center justify-center text-on-surface active:bg-surface active:scale-90 transition-all text-[16px] font-bold select-none disabled:opacity-50"
              type="button"
              onClick={handlePlus}
              disabled={quantity >= 99}
              aria-label={`Aumentar cantidad de ${product.name}`}
            >
              +
            </button>
          </div>

          <button
            className={`btn-add flex-1 h-9 rounded-full font-label-sm text-label-sm flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm ${
              isAdded
                ? 'bg-secondary text-on-secondary'
                : 'bg-primary text-on-primary'
            }`}
            type="button"
            onClick={handleAdd}
            aria-label={`Añadir ${product.name} al carrito`}
          >
            {isAdded ? (
              <>
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Listo</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>Añadir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

