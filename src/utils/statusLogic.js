/**
 * PureSight — Status Logic
 * Pure functions that compute overall water safety status from sensor readings.
 * Keeping this separate from React makes it fully unit-testable.
 */

/**
 * Compute the overall system status.
 * @param {object} readings - All sensor readings
 * @returns {'SAFE'|'WARNING'|'DANGER'}
 */
export function computeOverallStatus({ tds, turbidity, uvActive, filterLife, filterAuthentic }) {
  // Hard fails — immediate DANGER
  if (!uvActive) return 'DANGER';
  if (!filterAuthentic) return 'DANGER';
  if (tds > 300) return 'DANGER';
  if (turbidity > 4.0) return 'DANGER';

  // Soft fails — WARNING
  if (filterLife < 15) return 'WARNING';
  if (tds > 150) return 'WARNING';
  if (turbidity > 1.0) return 'WARNING';

  return 'SAFE';
}

/**
 * Returns human-readable label + subtext for a given status.
 */
export function getStatusLabel(status) {
  switch (status) {
    case 'SAFE':
      return {
        headline: 'Safe to Drink',
        subtext: 'All parameters within healthy limits',
        emoji: '✓',
      };
    case 'WARNING':
      return {
        headline: 'Caution',
        subtext: 'One or more readings need attention',
        emoji: '⚠',
      };
    case 'DANGER':
      return {
        headline: 'Do Not Drink',
        subtext: 'Critical issue detected — contact facility staff',
        emoji: '✕',
      };
    default:
      return { headline: 'Checking...', subtext: 'Sensor data loading', emoji: '…' };
  }
}

/**
 * Returns a color token name (used as CSS class suffix) for a metric value.
 * @param {number} value
 * @param {object} thresholds - { warn, danger }
 */
export function getMetricHealth(value, { warn, danger }) {
  if (value >= danger) return 'danger';
  if (value >= warn) return 'warning';
  return 'safe';
}

/**
 * TDS-specific thresholds (ppm)
 *   0–150:  SAFE  (WHO guideline ≤300, ideal ≤150)
 *   150–300: WARNING
 *   300+:   DANGER
 */
export const TDS_THRESHOLDS = { warn: 150, danger: 300 };

/**
 * Turbidity-specific thresholds (NTU)
 *   0–1: SAFE (WHO guideline ≤1 NTU for drinking water)
 *   1–4: WARNING
 *   4+:  DANGER
 */
export const TURBIDITY_THRESHOLDS = { warn: 1.0, danger: 4.0 };

/**
 * Temperature-specific thresholds (°C)
 *   10–30: SAFE
 *   30–40: WARNING (warm water — bacterial risk)
 *   40+:   DANGER
 */
export const TEMP_THRESHOLDS = { warn: 30, danger: 40 };

/**
 * Estimate days remaining for the filter based on % life left.
 * Assumes a typical 6-month (180-day) filter cycle.
 */
export function estimateFilterDays(filterLifePercent) {
  return Math.round((filterLifePercent / 100) * 180);
}
