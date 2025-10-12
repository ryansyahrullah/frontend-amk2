import type { JenisStatus } from '../types';

export const STATUS_KEPEGAWAIAN_OPTIONS = [
  { label: 'Kontrak', value: 'Kontrak' },
  { label: 'Permanen', value: 'Permanen' }
] as const;

export const KONTRAK_OPTIONS = Array.from({ length: 8 }).map((_, index) => ({
  label: `Kontrak ${index + 1}`,
  value: `Kontrak ${index + 1}` as JenisStatus
}));

export const JABATAN_OPTIONS = [
  'Driver',
  'Helper',
  'Kasir',
  'Admin J-Part',
  'Mekanik',
  'GL',
  'Officer SHE',
  'Chief Mekanik',
  'Mekanik Junior',
  'Security',
  'Wakar',
  'Fuelman',
  'General Support',
  'PJO',
  'GM'
].map((label) => ({ label, value: label }));

export const STATUS_PERNIKAHAN_OPTIONS = [
  { label: 'Lajang', value: 'Lajang' },
  { label: 'Menikah', value: 'Menikah' },
  { label: 'Janda', value: 'Janda' },
  { label: 'Duda', value: 'Duda' }
] as const;

export const GOLONGAN_DARAH_OPTIONS = ['A', 'B', 'AB', 'O'].map((label) => ({ label, value: label }));

export const SEPATU_OPTIONS = Array.from({ length: 13 }).map((_, index) => {
  const size = 36 + index;
  return { label: `Ukuran ${size}`, value: String(size) };
});

export const UKURAN_BAJU_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((label) => ({ label, value: label }));

export const UKURAN_CELANA_OPTIONS = Array.from({ length: 13 }).map((_, index) => {
  const size = 28 + index;
  return { label: `Ukuran ${size}`, value: String(size) };
});
