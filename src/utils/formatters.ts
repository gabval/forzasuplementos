/**
 * Formats a number to Argentine Pesos (ARS) string representation.
 * Deterministic format: 24500 -> "$24.500"
 * Ensures zero hydration mismatches across server and browser locales.
 */
export function formatPriceARS(price: number): string {
  const formatted = Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${formatted}`;
}

/**
 * Calculates discount percentage if promo price is active
 */
export function getDiscountPercentage(regular: number, promo: number): number {
  if (!regular || !promo || regular <= promo) return 0;
  return Math.round(((regular - promo) / regular) * 100);
}
