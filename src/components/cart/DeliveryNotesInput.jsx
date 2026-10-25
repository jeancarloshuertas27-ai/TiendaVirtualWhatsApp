import React from 'react';

/**
 * Campo de texto controlado para notas de entrega opcionales
 * @param {{
 *   notes: string,
 *   onChange: (notes: string) => void
 * }} props
 */
export function DeliveryNotesInput({ notes = '', onChange }) {
  return (
    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
      <div className="flex items-center gap-2 text-on-surface">
        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
          chat_bubble_outline
        </span>
        <label
          className="font-label-lg text-label-lg cursor-pointer"
          htmlFor="order-notes"
        >
          Notas para la entrega (opcional)
        </label>
      </div>
      <input
        className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-3 py-2.5 outline-none placeholder:text-outline focus:bg-surface-container transition-colors"
        data-testid="order-notes"
        id="order-notes"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ej. Timbre número 4, dejar en conserjería..."
        type="text"
        value={notes}
      />
    </div>
  );
}

