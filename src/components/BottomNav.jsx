import React from 'react';

export function BottomNav({ onCartClick }) {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 px-margin">
        <button
          className="flex flex-col items-center justify-center min-w-[56px] h-12 text-primary font-semibold transition-colors cursor-pointer"
          type="button"
          aria-current="page"
        >
          <span className="material-symbols-outlined text-[22px]">storefront</span>
          <span className="font-label-sm text-label-sm mt-0.5">Catálogo</span>
        </button>

        <button
          className="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          type="button"
          onClick={onCartClick}
          aria-label="Abrir carrito"
        >
          <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
          <span className="font-label-sm text-label-sm mt-0.5">Carrito</span>
        </button>

        <button
          className="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-on-surface transition-colors cursor-default"
          type="button"
          aria-label="Pedidos"
        >
          <span className="material-symbols-outlined text-[22px]">receipt_long</span>
          <span className="font-label-sm text-label-sm mt-0.5">Pedidos</span>
        </button>

        <button
          className="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-on-surface transition-colors cursor-default"
          type="button"
          aria-label="Perfil"
        >
          <span className="material-symbols-outlined text-[22px]">account_circle</span>
          <span className="font-label-sm text-label-sm mt-0.5">Perfil</span>
        </button>
      </div>
    </nav>
  );
}

