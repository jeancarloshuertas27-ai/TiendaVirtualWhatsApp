import React from 'react';

/**
 * Encabezado de la vista 'Tu Pedido'
 * @param {{ itemsCount: number, onClose: () => void }} props
 */
export function CartHeader({ itemsCount = 0, onClose }) {
  const badgeText = `${itemsCount} ${itemsCount === 1 ? 'artículo' : 'artículos'}`;

  return (
    <div className="flex items-center justify-between pt-2">
      <div className="flex items-baseline gap-space-xs">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Tu Pedido
        </h1>
        <span
          className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium"
          data-testid="items-badge"
          id="items-badge"
        >
          {badgeText}
        </span>
      </div>
      <button
        aria-label="Volver al catálogo"
        className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
        data-path="catalogo"
        onClick={onClose}
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>
  );
}

