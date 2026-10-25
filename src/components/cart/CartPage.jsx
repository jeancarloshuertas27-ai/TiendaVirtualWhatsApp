import React from 'react';
import { useCart } from '../../hooks/useCart';
import { CartHeader } from './CartHeader';
import { FreeShippingTracker } from './FreeShippingTracker';
import { CartItemList } from './CartItemList';
import { CartEmptyState } from './CartEmptyState';
import { DeliveryNotesInput } from './DeliveryNotesInput';
import { OrderSummaryPanel } from './OrderSummaryPanel';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

/**
 * Vista completa 'Tu Pedido' (Módulo 002)
 */
export function CartPage() {
  const {
    items,
    totalCount,
    totalAmount,
    deliveryNotes,
    setDeliveryNotes,
    setCurrentView,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const handleClose = () => {
    setCurrentView('catalogo');
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    const url = buildWhatsAppUrl(items, totalAmount, deliveryNotes);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const hasItems = items.length > 0;

  return (
    <div className="flex flex-col w-full px-margin pb-6 gap-y-space-md" data-testid="cart-page">
      <CartHeader itemsCount={totalCount} onClose={handleClose} />

      {hasItems ? (
        <>
          <FreeShippingTracker />
          <CartItemList
            items={items}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
          <DeliveryNotesInput
            notes={deliveryNotes}
            onChange={setDeliveryNotes}
          />
        </>
      ) : (
        <CartEmptyState onExploreCatalog={handleClose} />
      )}

      <OrderSummaryPanel
        hasItems={hasItems}
        onCheckoutWhatsApp={handleCheckoutWhatsApp}
        subtotal={totalAmount}
        total={totalAmount}
      />
    </div>
  );
}

