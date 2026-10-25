import React from 'react';
import { formatPrice } from '../../utils/formatters';

/**
 * Panel de desglose financiero, botón oficial de WhatsApp y badges de confianza
 * @param {{
 *   subtotal: number,
 *   total: number,
 *   hasItems: boolean,
 *   onCheckoutWhatsApp: () => void
 * }} props
 */
export function OrderSummaryPanel({
  subtotal = 0,
  total = 0,
  hasItems = false,
  onCheckoutWhatsApp,
}) {
  return (
    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-md flex flex-col gap-3">
      {/* Financial Breakdown */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-on-surface-variant font-body-md text-body-md">
          <span>Subtotal</span>
          <span
            className="font-label-lg text-label-lg text-on-surface font-medium"
            data-testid="summary-subtotal"
            id="summary-subtotal"
          >
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center text-on-surface-variant font-body-md text-body-md">
          <span className="flex items-center gap-1">
            Envío a Domicilio{' '}
            <span className="bg-secondary-container text-on-secondary-container text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase">
              Promo
            </span>
          </span>
          <span className="font-label-lg text-label-lg text-secondary font-bold">
            GRATIS
          </span>
        </div>

        <div className="h-px bg-surface-container-high my-1"></div>

        <div className="flex justify-between items-baseline">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Total a pagar
          </span>
          <span
            className="font-price-lg text-price-lg text-on-surface tracking-tight font-extrabold"
            data-testid="summary-total"
            id="summary-total"
          >
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Official WhatsApp CTA Trigger */}
      <button
        aria-label="Enviar pedido por WhatsApp"
        className={`w-full h-13 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] active:scale-[0.98] text-white flex items-center justify-center gap-2.5 shadow-md shadow-[#25D366]/20 transition-all font-label-lg text-label-lg font-semibold tracking-wide cursor-pointer ${
          !hasItems ? 'opacity-50 pointer-events-none' : ''
        }`}
        data-testid="whatsapp-btn"
        disabled={!hasItems}
        id="whatsapp-btn"
        onClick={onCheckoutWhatsApp}
        type="button"
      >
        <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.908.533 3.69 1.455 5.217L2.12 21.88l4.787-1.306A10.02 10.02 0 0012.031 22c5.536 0 10.031-4.495 10.031-10.031S17.567 2 12.031 2zm0 18.232c-1.637 0-3.172-.45-4.496-1.233l-.322-.191-2.977.813.818-2.905-.21-.334a8.163 8.163 0 01-1.272-4.352c0-4.542 3.696-8.239 8.24-8.239 4.543 0 8.239 3.697 8.239 8.239 0 4.543-3.696 8.202-8.02 8.202zm4.515-6.175c-.247-.124-1.464-.722-1.691-.805-.227-.082-.392-.124-.557.124-.165.247-.64.805-.784.97-.144.165-.289.186-.536.062-.247-.124-1.043-.385-1.987-1.226-.735-.655-1.231-1.465-1.375-1.712-.144-.247-.015-.38.108-.504.112-.112.247-.289.371-.433.124-.144.165-.247.247-.412.082-.165.041-.309-.021-.433-.062-.124-.557-1.341-.763-1.836-.2-.483-.404-.418-.557-.426-.144-.008-.309-.01-.474-.01-.165 0-.433.062-.66.309-.227.247-.866.846-.866 2.063s.887 2.393 1.01 2.558c.124.165 1.745 2.664 4.228 3.737.591.256 1.053.409 1.413.523.594.189 1.134.162 1.562.098.477-.071 1.464-.598 1.67-1.176.206-.577.206-1.072.144-1.176-.062-.103-.227-.165-.474-.289z"></path>
        </svg>
        <span>Enviar pedido por WhatsApp</span>
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 text-on-surface-variant font-label-sm text-label-sm pt-1">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-secondary">lock</span>
          <span>Compra 100% Segura</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-secondary">flash_on</span>
          <span>Atención Inmediata</span>
        </div>
      </div>
    </div>
  );
}

