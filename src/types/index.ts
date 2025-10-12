export type UserRole = 'admin_hcgs' | 'pegawai' | 'admin_finance' | 'officer_site' | 'superadmin';

export interface LoginPayload {
  nrp: string;
  password: string;
}

export interface User {
  id: number;
  nama: string;
  role: UserRole;
  roles?: UserRole[];
  email?: string;
  pegawaiId?: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ManagedAccount {
  id: number;
  pegawaiId?: number | null;
  nama: string;
  nrp: string | null;
  email: string;
  password: string;
  roles: UserRole[];
}

export type StatusKepegawaian = 'Kontrak' | 'Permanen';

export type JenisStatus =
  | 'Kontrak 1'
  | 'Kontrak 2'
  | 'Kontrak 3'
  | 'Kontrak 4'
  | 'Kontrak 5'
  | 'Kontrak 6'
  | 'Kontrak 7'
  | 'Kontrak 8'
  | 'Permanen';

export type StatusPernikahan = 'Lajang' | 'Menikah' | 'Janda' | 'Duda';

export interface Pegawai {
  id: number;
  nrp: string;
  nama_lengkap: string;
  jabatan: string;
  pas_foto: string | null;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat_ktp: string;
  tinggi_badan: string;
  berat_badan: string;
  agama: string;
  status_pernikahan: StatusPernikahan;
  tanggal_pernikahan: string | null;
  no_ktp: string;
  no_kk: string;
  no_npwp: string;
  no_bpjs_kesehatan: string;
  no_bpjs_ketenagakerjaan: string;
  alamat_domisili: string;
  tanggal_masuk: string;
  status_kepegawaian: StatusKepegawaian;
  jenis_status: JenisStatus;
  akhir_kontrak: string | null;
  no_hp: string;
  telepon_2: string;
  email: string | null;
  password?: string | null;
  pendidikan_terakhir: string;
  pekerjaan_terakhir: string;
  golongan_darah: string;
  no_rekening: string;
  nama_rekening: string;
  bank_rekening: string;
  tanggungan_keluarga: string;
  susunan_keluarga: string;
  anak_ke: string;
  jumlah_saudara: string;
  sepatu_safety: string;
  ukuran_baju: string;
  ukuran_celana: string;
  ahli_waris_nama: string;
  ahli_waris_tempat_lahir: string;
  ahli_waris_tanggal_lahir: string;
  ahli_waris_hubungan: string;
  ahli_waris_alamat: string;
  ahli_waris_telepon: string;
  kontak_darurat_1_nama: string;
  kontak_darurat_1_hubungan: string;
  kontak_darurat_1_alamat: string;
  kontak_darurat_1_telepon: string;
  kontak_darurat_2_nama: string;
  kontak_darurat_2_hubungan: string;
  kontak_darurat_2_alamat: string;
  kontak_darurat_2_telepon: string;
  berkas_ktp: string;
  berkas_kk: string;
  berkas_npwp: string;
  berkas_bpjs_jkn: string;
  berkas_bpjs_jht: string;
  created_at: string;
  updated_at: string;
}

export interface ManagedCredentialPayload {
  email: string;
  password: string;
}

export interface StatistikResponse {
  jumlahPegawai: number;
  persentaseLengkap: number;
  habisKontrak: Pegawai[];
}

export interface Aktivitas {
  id: number;
  judul: string;
  deskripsi: string;
  waktu: string;
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
}

export interface PaginatedPegawai {
  data: Pegawai[];
  meta: PaginationMeta;
}

export interface PegawaiFilter {
  search?: string;
  page?: number;
  per_page?: number;
  filter?: string;
  sort?: string;
  status?: JenisStatus | 'all';
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
