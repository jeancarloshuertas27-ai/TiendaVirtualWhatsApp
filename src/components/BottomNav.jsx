import React from 'react';
import { useCart } from '../hooks/useCart';

export function BottomNav({ onCartClick, onCatalogClick }) {
  const { currentView, setCurrentView } = useCart();

  const handleCatalog = () => {
    if (onCatalogClick) {
      onCatalogClick();
    } else if (setCurrentView) {
      setCurrentView('catalogo');
    }
  };

  const handleCart = () => {
    if (onCartClick) {
      onCartClick();
    } else if (setCurrentView) {
      setCurrentView('carrito');
    }
  };

  const isCatalog = currentView === 'catalogo';
  const isCart = currentView === 'carrito';

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 px-margin">
        <button
          aria-current={isCatalog ? 'page' : undefined}
          aria-label="Catálogo"
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            isCatalog
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={handleCatalog}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">storefront</span>
          <span className="font-label-sm text-label-sm mt-0.5">Catálogo</span>
        </button>

        <button
          aria-current={isCart ? 'page' : undefined}
          aria-label="Abrir carrito"
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            isCart
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={handleCart}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
          <span className="font-label-sm text-label-sm mt-0.5">Carrito</span>
        </button>

        <button
          aria-label="Pedidos"
          className="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-on-surface transition-colors cursor-default"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">receipt_long</span>
          <span className="font-label-sm text-label-sm mt-0.5">Pedidos</span>
        </button>

        <button
          aria-label="Perfil"
          className="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-on-surface transition-colors cursor-default"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">account_circle</span>
          <span className="font-label-sm text-label-sm mt-0.5">Perfil</span>
        </button>
      </div>
    </nav>
  );
}
