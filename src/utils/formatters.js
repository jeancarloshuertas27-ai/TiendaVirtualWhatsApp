import { CURRENCY_SYMBOL } from '../config/constants';

/**
 * Formatea un número como monto en Soles peruanos
 * Ejemplo: 199 -> "S/ 199.00"
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return `${CURRENCY_SYMBOL} ${safeAmount.toFixed(2)}`;
}

/**
 * Pluraliza el contador de productos
 * Ejemplo: 1 -> "1 producto", 3 -> "3 productos"
 * @param {number} count
 * @returns {string}
 */
export function formatItemCount(count) {
  return `${count} ${count === 1 ? 'producto' : 'productos'}`;
}

