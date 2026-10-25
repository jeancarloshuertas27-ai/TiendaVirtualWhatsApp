import React from 'react';
import { useCart } from '../hooks/useCart';

export function Header({ onCartClick }) {
  const { totalCount } = useCart();

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <img
            alt="Store Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1V6pBPUWt4x9d1BkxeSTVmEbFDH0r_zB9Hsg0LrQkck9RCwuZjfKgb_fvNPpe5w9PH5pLWBV6uk65BCGrCjE1GAdv1qnce07Ov8-KWJP-DUEnJEvel1pzUkwLsnpFNkJjra7Q78dbqrq30S1lxr0hYJ8bqgwnfLLg5v2-JIHIk1YpEENc_ac0ip-xRqMDySIdXb16jIA5u7B6FlApu_waLtBYw7NbutRx7JdqUT8TXWpPhxDQx0gNip0hI"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none uppercase">
              NOVA STORE
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Catálogo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            aria-label="Carrito de compras"
            className="relative w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (onCartClick) onCartClick();
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {totalCount > 0 && (
              <span
                key={totalCount}
                className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-secondary text-on-secondary font-label-sm text-[10px] leading-tight rounded-full flex items-center justify-center font-bold pointer-events-none animate-pulse"
                data-testid="header-cart-badge"
              >
                {totalCount}
              </span>
            )}
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-1">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}

