const LOCATION_NAME_BY_ID: Record<number, string> = {
  1: 'Ground Floor',
  2: 'Ground Floor - Area A',
  3: 'Lantai P1',
  4: 'Lantai P1 - Area A',
  5: 'Lantai P2',
  6: 'Lantai P2 - Area A',
  7: 'Lantai P3',
  8: 'Lantai P3 - Area A',
  9: 'Lantai P4',
  10: 'Lantai P4 - Area A',
  11: 'Lantai P5',
};

type AnyObject = Record<string, unknown>;

function normalizeKey(key: string) {
  return key.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getStringByKnownKeys(source: AnyObject, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  const normalizedMap = new Map<string, string>();
  Object.keys(source).forEach((key) => {
    normalizedMap.set(normalizeKey(key), key);
  });

  for (const key of keys) {
    const mappedKey = normalizedMap.get(normalizeKey(key));
    if (!mappedKey) {
      continue;
    }

    const value = source[mappedKey];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function getNumericByKnownKeys(source: AnyObject, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

export function getLokasiDisplayName(lokasiMall: unknown) {
  if (!lokasiMall || typeof lokasiMall !== 'object') {
    return 'Mall';
  }

  const source = lokasiMall as AnyObject;

  const kodeLokasi = getStringByKnownKeys(source, [
    'KodeLokasi',
    'kode_lokasi',
    'kodeLokasi',
  ]);

  if (kodeLokasi) {
    return kodeLokasi;
  }

  const namaLokasi = getStringByKnownKeys(source, [
    'NamaLokasi',
    'nama_lokasi',
    'namaLokasi',
  ]);

  if (namaLokasi) {
    return namaLokasi;
  }

  const idLokasiMall = getNumericByKnownKeys(source, [
    'IDLokasiMall',
    'id_lokasi_mall',
    'idLokasiMall',
  ]);

  if (idLokasiMall != null && LOCATION_NAME_BY_ID[idLokasiMall]) {
    return LOCATION_NAME_BY_ID[idLokasiMall];
  }

  if (idLokasiMall != null) {
    return `Mall ${idLokasiMall}`;
  }

  return 'Mall';
}
