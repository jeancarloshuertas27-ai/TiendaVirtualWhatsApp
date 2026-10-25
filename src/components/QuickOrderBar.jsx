import React from 'react';
import { formatPrice, formatItemCount } from '../utils/formatters';

export function QuickOrderBar({ totalItems, totalAmount, onOpenDrawer }) {
  if (!totalItems || totalItems <= 0) return null;

  return (
    <div
      className="fixed bottom-16 inset-x-0 z-40 px-margin pb-2 pointer-events-none transition-all duration-300"
      data-testid="quick-order-bar"
    >
      <div
        className="pointer-events-auto mx-auto max-w-md w-full bg-surface-container-lowest/95 backdrop-blur-xl rounded-xl p-space-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between gap-space-sm cursor-pointer transition-all active:scale-[0.99]"
        onClick={onOpenDrawer}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenDrawer();
          }
        }}
        aria-label="Ver resumen de la orden"
      >
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm relative">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary animate-ping"
              aria-hidden="true"
            />
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                {formatItemCount(totalItems)}
              </span>
              <span className="text-on-surface-variant font-body-sm text-body-sm">•</span>
              <span className="font-price-md text-price-md text-on-surface">
                {formatPrice(totalAmount)}
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">
              Toca para finalizar compra
            </span>
          </div>
        </div>

        <button
          className="flex-shrink-0 h-10 px-4 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm active:opacity-90 cursor-pointer"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDrawer();
          }}
        >
          <span>Ver Carro</span>
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

