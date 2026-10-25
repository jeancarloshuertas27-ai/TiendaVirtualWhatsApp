import React from 'react';
import { formatPrice } from '../utils/formatters';

export function CartDrawer({ isOpen, onClose, items, totalAmount, onCheckoutWhatsApp }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      data-testid="cart-drawer-backdrop"
    >
      <div
        className="absolute bottom-0 inset-x-0 bg-surface-container-lowest rounded-t-2xl p-space-lg shadow-2xl max-h-[85vh] flex flex-col transition-transform duration-300 transform translate-y-0"
        onClick={(e) => e.stopPropagation()}
        data-testid="cart-drawer-sheet"
      >
        {/* Drawer Handle & Header */}
        <div className="w-12 h-1 bg-surface-container-high rounded-full mx-auto mb-space-md" />
        <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Tu Orden Actual
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Resumen previo a checkout de WhatsApp
            </p>
          </div>
          <button
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant active:scale-95 transition-transform cursor-pointer"
            onClick={onClose}
            aria-label="Cerrar resumen"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto py-space-md space-y-space-sm">
          {items.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant font-body-md">
              No tienes productos agregados aún.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between p-space-sm bg-surface rounded-xl"
                data-testid={`drawer-item-${item.productId}`}
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-on-surface text-[24px]">
                        shopping_bag
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-title-md text-title-md text-on-surface truncate">
                      {item.name}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
                    </p>
                  </div>
                </div>
                <span className="font-price-md text-price-md text-on-surface flex-shrink-0 ml-2">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Final Checkout Action */}
        <div className="pt-space-md border-t border-surface-container-high space-y-space-sm">
          <div className="flex items-baseline justify-between">
            <span className="font-body-lg text-body-lg text-on-surface-variant">
              Total estimado
            </span>
            <span
              className="font-headline-md text-headline-md text-on-surface font-bold"
              data-testid="drawer-total"
            >
              {formatPrice(totalAmount)}
            </span>
          </div>

          <button
            className="w-full h-12 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-50"
            disabled={items.length === 0}
            onClick={onCheckoutWhatsApp}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Confirmar Pedido vía WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}

