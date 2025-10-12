import type { UserRole } from '../types';

export const roleLabelMap: Record<UserRole, string> = {
  admin_hcgs: 'Admin HCGS',
  pegawai: 'Pegawai',
  admin_finance: 'Admin Finance',
  officer_site: 'Officer Site',
  superadmin: 'Super Admin'
};

export const roleDescriptionMap: Partial<Record<UserRole, string>> = {
  admin_hcgs: 'Kelola data pegawai dan administrasi.',
  pegawai: 'Akses biodata dan slip gaji pribadi.',
  admin_finance: 'Monitoring keuangan perusahaan.',
  officer_site: 'Koordinasi operasional di lapangan.',
  superadmin: 'Mengatur hak akses dan role seluruh pegawai.'
};
