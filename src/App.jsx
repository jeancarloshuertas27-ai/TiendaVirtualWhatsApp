import React, { useState, useMemo } from 'react';
import productsData from './data/products.json';
import { CartProvider } from './context/CartContext';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header';
import { CategoryPills } from './components/CategoryPills';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { ProductGrid } from './components/ProductGrid';
import { QuickOrderBar } from './components/QuickOrderBar';
import { CartDrawer } from './components/CartDrawer';
import { BottomNav } from './components/BottomNav';
import { CartPage } from './components/cart/CartPage';
import { buildWhatsAppUrl } from './utils/whatsapp';

function CatalogApp() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    items,
    totalCount,
    totalAmount,
    deliveryNotes,
    currentView,
    setCurrentView,
  } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todos') {
      return productsData;
    }
    return productsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleOpenCart = () => {
    setCurrentView('carrito');
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    const url = buildWhatsAppUrl(items, totalAmount, deliveryNotes);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsDrawerOpen(false);
  };

  return (
    <div className="bg-surface-container-low min-h-screen flex justify-center antialiased font-body-md text-on-surface">
      <div className="w-full max-w-md min-h-screen bg-surface flex flex-col relative shadow-2xl border-x border-surface-container-high/40">
        <Header onCartClick={handleOpenCart} />

        <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface flex-1">
          {currentView === 'carrito' ? (
            <CartPage />
          ) : (
            <>
              <div className="flex flex-col w-full pb-20">
                <CategoryPills
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                />
                <AnnouncementBanner />
                <ProductGrid products={filteredProducts} />
              </div>

              <QuickOrderBar
                onOpenDrawer={handleOpenCart}
                totalAmount={totalAmount}
                totalItems={totalCount}
              />

              <CartDrawer
                isOpen={isDrawerOpen}
                items={items}
                onCheckoutWhatsApp={handleCheckoutWhatsApp}
                onClose={handleCloseDrawer}
                totalAmount={totalAmount}
              />
            </>
          )}
        </main>

        <BottomNav
          onCatalogClick={() => setCurrentView('catalogo')}
          onCartClick={handleOpenCart}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <CatalogApp />
    </CartProvider>
  );
}
