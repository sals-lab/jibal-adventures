import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// =============================================================================
// CLASSNAME UTILITY
// =============================================================================
// Combines clsx and tailwind-merge for optimal className handling.
// Usage: cn("base-class", conditional && "conditional-class", props.className)
// =============================================================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =============================================================================
// FORMAT UTILITIES
// =============================================================================

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format date string to readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Parse trip dates string into array of date ranges
 * Input: "2026-05-10 to 2026-05-16; 2026-09-14 to 2026-09-20"
 * Output: [{ start: "May 10, 2026", end: "May 16, 2026" }, ...]
 */
export function parseTripDates(
  datesString: string
): Array<{ start: string; end: string; raw: { start: string; end: string } }> {
  if (!datesString || datesString.trim() === "") return [];

  const dateRanges = datesString
    .split(";")
    .map((range) => range.trim())
    .filter(Boolean);

  return dateRanges.map((range) => {
    const [startRaw, endRaw] = range.split(" to ").map((d) => d.trim());
    return {
      start: formatDate(startRaw),
      end: formatDate(endRaw),
      raw: { start: startRaw, end: endRaw },
    };
  });
}

/**
 * Calculate trip duration from dates string
 */
export function calculateDuration(datesString: string): number | null {
  const dates = parseTripDates(datesString);
  if (dates.length === 0) return null;

  const { start, end } = dates[0].raw;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays;
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
