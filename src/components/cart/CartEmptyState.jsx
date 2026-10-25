import React from 'react';

/**
 * Estado vacío para cuando no hay productos en el carrito
 * @param {{ onExploreCatalog: () => void }} props
 */
export function CartEmptyState({ onExploreCatalog }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-6 text-center bg-surface-container-lowest rounded-xl shadow-sm"
      data-testid="cart-empty-state"
      id="cart-empty-state"
    >
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-3">
        <span className="material-symbols-outlined text-[32px]">shopping_basket</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
        Tu carrito está vacío
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mb-4">
        Descubre nuestros productos en tendencia y recíbelos en la puerta de tu hogar.
      </p>
      <button
        className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg transition-transform active:scale-95 shadow-sm cursor-pointer"
        data-path="catalogo"
        onClick={onExploreCatalog}
        type="button"
      >
        Explorar Catálogo
      </button>
    </div>
  );
}

