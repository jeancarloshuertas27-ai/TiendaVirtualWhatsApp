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
import { buildWhatsAppUrl } from './utils/whatsapp';

function CatalogApp() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { items, totalCount, totalAmount } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todos') {
      return productsData;
    }
    return productsData.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    const url = buildWhatsAppUrl(items, totalAmount);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsDrawerOpen(false);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Header onCartClick={handleOpenDrawer} />

      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full pb-20">
          <CategoryPills
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
          <AnnouncementBanner />
          <ProductGrid products={filteredProducts} />
        </div>

        <QuickOrderBar
          totalItems={totalCount}
          totalAmount={totalAmount}
          onOpenDrawer={handleOpenDrawer}
        />

        <CartDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          items={items}
          totalAmount={totalAmount}
          onCheckoutWhatsApp={handleCheckoutWhatsApp}
        />
      </main>

      <BottomNav onCartClick={handleOpenDrawer} />
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

