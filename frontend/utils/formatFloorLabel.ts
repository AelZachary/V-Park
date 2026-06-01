const normalize = (value: string) => value.trim().toLowerCase();

const AREA_PATTERN = /area\s*([a-z0-9]+)/i;
const LANTAI_PATTERN = /lantai\s*(p?\d+)/i;
const GROUND_FLOOR_PATTERN = /ground\s*floor/i;
const GROUND_PATTERN = /ground/i;
const FLOOR_NUMBER_PATTERN = /floor\s*(\d+)/i;

export function formatFloorLabel(rawLabel: string | null | undefined) {
  if (!rawLabel) return '';

  const label = String(rawLabel).trim();
  if (!label) return '';

  const lower = normalize(label);

  if (GROUND_FLOOR_PATTERN.test(lower) || (GROUND_PATTERN.test(lower) && !LANTAI_PATTERN.test(lower))) {
    const areaMatch = label.match(AREA_PATTERN);
    return areaMatch ? `Ground Floor - Area ${areaMatch[1].toUpperCase()}` : 'Ground Floor';
  }

  const lantaiMatch = label.match(LANTAI_PATTERN);
  if (lantaiMatch) {
    const floorKey = lantaiMatch[1].toUpperCase();
    const areaMatch = label.match(AREA_PATTERN);
    return areaMatch ? `Lantai ${floorKey} - Area ${areaMatch[1].toUpperCase()}` : `Lantai ${floorKey}`;
  }

  const floorNumberMatch = label.match(FLOOR_NUMBER_PATTERN);
  if (floorNumberMatch) {
    return `Lantai ${floorNumberMatch[1]}`;
  }

  // If the value already looks like a floor name, preserve it.
  if (/^ground\s*floor/i.test(label) || /^lantai\s*p?\d+/i.test(label)) {
    return label;
  }

  return label;
}
