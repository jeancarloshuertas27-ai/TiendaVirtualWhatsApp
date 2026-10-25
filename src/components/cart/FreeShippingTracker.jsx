import React from 'react';

/**
 * Barra de progreso y banner de Envío Gratis (100%)
 */
export function FreeShippingTracker() {
  return (
    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
          <span className="font-label-md text-label-md text-on-surface">
            ¡Genial! Calificas para Envío Gratis
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-secondary font-bold">100%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
        <div className="h-full bg-secondary rounded-full w-full transition-all duration-500"></div>
      </div>
    </div>
  );
}

