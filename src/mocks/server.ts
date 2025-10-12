import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import type {
  Aktivitas,
  AuthResponse,
  JenisStatus,
  ManagedAccount,
  Pegawai,
  StatistikResponse,
  User,
  UserRole
} from '../types';

interface Credential {
  identifiers: string[];
  password: string;
  user: User;
}

interface SessionContext {
  token: string;
  user: User;
}

const formatNrp = (sequence: number) => `AMK122${String(sequence).padStart(3, '0')}`;

const credentials: Credential[] = [
  {
    identifiers: ['superadmin@gmail.com', 'superadmin'],
    password: 'superadmin123',
    user: {
      id: 99,
      nama: 'Super Administrator',
      role: 'superadmin',
      roles: ['superadmin'],
      email: 'superadmin@gmail.com'
    }
  },
  {
    identifiers: ['amk122001'],
    password: 'admin123',
    user: {
      id: 1,
      nama: 'Amelia Kusuma',
      role: 'admin_hcgs',
      roles: ['admin_hcgs', 'pegawai'],
      email: 'admin@gmail.com',
      pegawaiId: 1
    }
  },
  {
    identifiers: ['amk122002'],
    password: 'pegawai123',
    user: {
      id: 2,
      nama: 'Rizky Saputra',
      role: 'pegawai',
      roles: ['pegawai'],
      email: 'pegawai@gmail.com',
      pegawaiId: 2
    }
  },
  {
    identifiers: ['amk122003'],
    password: 'finance123',
    user: {
      id: 3,
      nama: 'Nadia Finance',
      role: 'admin_finance',
      roles: ['admin_finance', 'pegawai'],
      email: 'finance@gmail.com',
      pegawaiId: 3
    }
  },
  {
    identifiers: ['amk122004'],
    password: 'officer123',
    user: {
      id: 4,
      nama: 'Bima Officer',
      role: 'officer_site',
      roles: ['officer_site', 'pegawai'],
      email: 'officer@gmail.com',
      pegawaiId: 4
    }
  }
];

const sessions = new Map<string, User>();

const assignableRoles: UserRole[] = ['admin_hcgs', 'admin_finance', 'officer_site'];

const normalizeAssignableRoles = (roles: UserRole[]): UserRole[] => {
  const allowed = new Set<UserRole>();
  roles.forEach((role) => {
    if (role === 'pegawai' || assignableRoles.includes(role)) {
      allowed.add(role);
    }
  });
  allowed.add('pegawai');
  return Array.from(allowed);
};

const sanitizeIdentifier = (value: string | null | undefined) => value?.toString().trim().toLowerCase() ?? '';

const updateSessionsForUser = (userId: number, updater: (user: User) => User) => {
  sessions.forEach((sessionUser, token) => {
    if (sessionUser.id !== userId) return;
    sessions.set(token, updater(sessionUser));
  });
};

const refreshSessionsForUser = (userId: number, roles: UserRole[]) => {
  const normalized: UserRole[] = roles.length > 0 ? roles : (['pegawai'] as UserRole[]);
  updateSessionsForUser(userId, (sessionUser) => {
    const activeRole: UserRole = normalized.includes(sessionUser.role) ? sessionUser.role : normalized[0];
    return {
      ...sessionUser,
      roles: normalized,
      role: activeRole
    };
  });
};

const updateCredentialIdentifiers = (
  credential: Credential,
  current: { email?: string | null; nrp?: string | null },
  previous?: { email?: string | null; nrp?: string | null }
) => {
  const sanitizedPrevNrp = sanitizeIdentifier(previous?.nrp);
  const sanitizedNrp = sanitizeIdentifier(current.nrp);
  const identifier = sanitizedNrp || sanitizedPrevNrp;
  credential.identifiers = identifier ? [identifier] : [];
};

const generateDefaultPassword = (pegawai: Pegawai) => `Pegawai${String(pegawai.id).padStart(3, '0')}#123`;

const syncCredentialForPegawai = (
  pegawai: Pegawai,
  previous?: { email?: string | null; nrp?: string | null }
): Credential => {
  let credential = credentials.find((cred) => cred.user.pegawaiId === pegawai.id);
  if (!credential) {
    const password = pegawai.password && pegawai.password.trim() ? pegawai.password : generateDefaultPassword(pegawai);
    credential = {
      identifiers: [],
      password,
      user: {
        id: pegawai.id,
        nama: pegawai.nama_lengkap,
        role: 'pegawai',
        roles: ['pegawai'],
        email: pegawai.email ?? '',
        pegawaiId: pegawai.id
      }
    };
    credentials.push(credential);
  } else {
    if (pegawai.password && pegawai.password.trim()) {
      credential.password = pegawai.password;
    }
    credential.user.nama = pegawai.nama_lengkap;
    credential.user.email = pegawai.email ?? credential.user.email ?? '';
    credential.user.pegawaiId = pegawai.id;
    credential.user.roles = normalizeAssignableRoles(credential.user.roles ?? ['pegawai']);
    if (!credential.user.roles.includes(credential.user.role)) {
      credential.user.role = 'pegawai';
    }
  }

  const primaryAdminNrp = formatNrp(1).toLowerCase();
  const currentNrp = sanitizeIdentifier(pegawai.nrp);
  if (currentNrp === primaryAdminNrp) {
    const ensuredRoles = new Set<UserRole>(credential.user.roles ?? []);
    ensuredRoles.add('admin_hcgs');
    ensuredRoles.add('pegawai');
    credential.user.roles = Array.from(ensuredRoles);
    credential.user.role = 'admin_hcgs';
  }

  updateCredentialIdentifiers(credential, { email: pegawai.email, nrp: pegawai.nrp }, previous);

  pegawai.password = credential.password;

  updateSessionsForUser(credential.user.id, (sessionUser) => ({
    ...sessionUser,
    email: credential.user.email ?? '',
    nama: credential.user.nama
  }));

  refreshSessionsForUser(credential.user.id, credential.user.roles ?? ['pegawai']);

  return credential;
};

credentials.forEach((credential) => {
  if (credential.user.role === 'superadmin') {
    const unique = new Set<UserRole>(credential.user.roles ?? ['superadmin']);
    unique.add('superadmin');
    credential.user.roles = Array.from(unique);
    return;
  }
  const normalized = normalizeAssignableRoles(credential.user.roles ?? [credential.user.role]);
  credential.user.roles = normalized;
  if (!normalized.includes(credential.user.role)) {
    credential.user.role = 'pegawai';
  }
});

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const resolveSession = (config: AxiosRequestConfig): SessionContext | null => {
  const authHeader =
    (config.headers?.Authorization as string | undefined) ||
    (config.headers?.authorization as string | undefined);

  if (!authHeader) return null;

  const token = authHeader.replace('Bearer', '').trim();
  if (!token) return null;

  const user = sessions.get(token);
  if (!user) return null;

  return { token, user: clone(user) };
};

const requireAuth = (
  config: AxiosRequestConfig,
  roles?: UserRole[]
): { ok: true; session: SessionContext } | { ok: false; response: [number, { message: string }] } => {
  const session = resolveSession(config);
  if (!session) {
    return { ok: false, response: [401, { message: 'Tidak terautentikasi.' }] };
  }

  if (roles && roles.length > 0 && !roles.includes(session.user.role)) {
    return { ok: false, response: [403, { message: 'Anda tidak memiliki akses.' }] };
  }

  return { ok: true, session };
};

const kontrakStatusLabels: JenisStatus[] = [
  'Kontrak 1',
  'Kontrak 2',
  'Kontrak 3',
  'Kontrak 4',
  'Kontrak 5',
  'Kontrak 6',
  'Kontrak 7',
  'Kontrak 8'
];

const normalizeJenisStatus = (status: string | undefined, statusKepegawaian: string): JenisStatus => {
  if (statusKepegawaian === 'Permanen') {
    return 'Permanen';
  }
  if (status && kontrakStatusLabels.includes(status as JenisStatus)) {
    return status as JenisStatus;
  }
  return 'Kontrak 1';
};

const defaultPegawaiFields = (): Omit<Pegawai, 'id' | 'created_at' | 'updated_at'> => ({
  nrp: '',
  nama_lengkap: '',
  jabatan: '',
  pas_foto: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  alamat_ktp: '',
  tinggi_badan: '',
  berat_badan: '',
  agama: '',
  status_pernikahan: 'Lajang',
  tanggal_pernikahan: null,
  no_ktp: '',
  no_kk: '',
  no_npwp: '',
  no_bpjs_kesehatan: '',
  no_bpjs_ketenagakerjaan: '',
  alamat_domisili: '',
  tanggal_masuk: '',
  status_kepegawaian: 'Kontrak',
  jenis_status: 'Kontrak 1',
  akhir_kontrak: null,
  no_hp: '',
  telepon_2: '',
  email: '',
  password: '',
  pendidikan_terakhir: '',
  pekerjaan_terakhir: '',
  golongan_darah: '',
  no_rekening: '',
  nama_rekening: '',
  bank_rekening: '',
  tanggungan_keluarga: '',
  susunan_keluarga: '',
  anak_ke: '',
  jumlah_saudara: '',
  sepatu_safety: '',
  ukuran_baju: '',
  ukuran_celana: '',
  ahli_waris_nama: '',
  ahli_waris_tempat_lahir: '',
  ahli_waris_tanggal_lahir: '',
  ahli_waris_hubungan: '',
  ahli_waris_alamat: '',
  ahli_waris_telepon: '',
  kontak_darurat_1_nama: '',
  kontak_darurat_1_hubungan: '',
  kontak_darurat_1_alamat: '',
  kontak_darurat_1_telepon: '',
  kontak_darurat_2_nama: '',
  kontak_darurat_2_hubungan: '',
  kontak_darurat_2_alamat: '',
  kontak_darurat_2_telepon: '',
  berkas_ktp: '',
  berkas_kk: '',
  berkas_npwp: '',
  berkas_bpjs_jkn: '',
  berkas_bpjs_jht: ''
});

const createSamplePegawai = (): Pegawai[] => {
  const now = new Date();
  return Array.from({ length: 25 }).map((_, index) => {
    const id = index + 1;
    const kontrak = index % 2 === 0;
    const kontrakLabel = kontrak ? kontrakStatusLabels[index % kontrakStatusLabels.length] : 'Permanen';
    const tanggalMasuk = new Date(now);
    tanggalMasuk.setFullYear(now.getFullYear() - (index % 6));
    const akhirKontrak = new Date(now);
    akhirKontrak.setDate(now.getDate() + (index + 1) * 7);
    const timestamp = new Date().toISOString();
    const base = defaultPegawaiFields();

    return {
      ...base,
      id,
      nrp: formatNrp(id),
      nama_lengkap: `Pegawai ${id}`,
      jabatan: kontrak ? 'Driver' : 'Helper',
      tempat_lahir: 'Surabaya',
      tanggal_lahir: '1990-01-01',
      alamat_ktp: 'Jl. Contoh No. 123',
      tinggi_badan: '170',
      berat_badan: '65',
      agama: 'Islam',
      status_pernikahan: 'Lajang',
      tanggal_pernikahan: null,
      no_ktp: `3501${String(id).padStart(12, '0')}`,
      no_kk: `350101${String(id).padStart(10, '0')}`,
      no_npwp: `12.345.678.${String(id).padStart(3, '0')}-000`,
      no_bpjs_kesehatan: `1234567890${String(index).padStart(2, '0')}`,
      no_bpjs_ketenagakerjaan: `9876543210${String(index).padStart(2, '0')}`,
      alamat_domisili: 'Jl. Domisili No. 45',
      tanggal_masuk: tanggalMasuk.toISOString().split('T')[0],
      status_kepegawaian: kontrak ? 'Kontrak' : 'Permanen',
      jenis_status: kontrak ? kontrakLabel : 'Permanen',
      akhir_kontrak: kontrak ? akhirKontrak.toISOString().split('T')[0] : null,
      no_hp: '081234567890',
      telepon_2: '081298765432',
      email: `pegawai${index + 1}@contoh.com`,
      password: `Pegawai${String(id).padStart(3, '0')}#123`,
      pendidikan_terakhir: 'SMA',
      pekerjaan_terakhir: 'Karyawan',
      golongan_darah: ['A', 'B', 'O', 'AB'][index % 4],
      no_rekening: `12345678${String(id).padStart(4, '0')}`,
      nama_rekening: `Pegawai ${id}`,
      bank_rekening: 'Bank AMK',
      tanggungan_keluarga: String((index % 4) + 1),
      susunan_keluarga: 'Suami/Istri, Anak 1, Anak 2',
      anak_ke: String((index % 3) + 1),
      jumlah_saudara: String((index % 5) + 1),
      sepatu_safety: String(39 + (index % 6)),
      ukuran_baju: ['S', 'M', 'L', 'XL'][index % 4],
      ukuran_celana: String(30 + (index % 6)),
      ahli_waris_nama: 'Ahli Waris Contoh',
      ahli_waris_tempat_lahir: 'Malang',
      ahli_waris_tanggal_lahir: '1995-02-02',
      ahli_waris_hubungan: 'Istri',
      ahli_waris_alamat: 'Jl. Ahli Waris No. 1',
      ahli_waris_telepon: '081234000111',
      kontak_darurat_1_nama: 'Kontak Darurat 1',
      kontak_darurat_1_hubungan: 'Kakak',
      kontak_darurat_1_alamat: 'Jl. Kakak No. 1',
      kontak_darurat_1_telepon: '0812000111',
      kontak_darurat_2_nama: 'Kontak Darurat 2',
      kontak_darurat_2_hubungan: 'Teman',
      kontak_darurat_2_alamat: 'Jl. Teman No. 2',
      kontak_darurat_2_telepon: '081299988877',
      berkas_ktp: 'ktp.pdf',
      berkas_kk: 'kk.pdf',
      berkas_npwp: 'npwp.pdf',
      berkas_bpjs_jkn: 'bpjs-jkn.pdf',
      berkas_bpjs_jht: 'bpjs-jht.pdf',
      created_at: timestamp,
      updated_at: timestamp
    };
  });
};

const pegawaiData = createSamplePegawai();

const pegawaiAdmin = pegawaiData.find((pegawai) => pegawai.id === 1);
if (pegawaiAdmin) {
  Object.assign(pegawaiAdmin, {
    nrp: formatNrp(1),
    nama_lengkap: 'Amelia Kusuma',
    jabatan: 'Admin SDM',
    pas_foto: 'amelia-kusuma.jpg',
    tempat_lahir: 'Surabaya',
    tanggal_lahir: '1992-03-18',
    alamat_ktp: 'Jl. Merdeka No. 12, Surabaya',
    tinggi_badan: '168',
    berat_badan: '58',
    agama: 'Islam',
    status_pernikahan: 'Menikah',
    tanggal_pernikahan: '2018-06-02',
    no_ktp: '3578121803920001',
    no_kk: '3578020405120002',
    no_npwp: '45.678.910.1-005.000',
    no_bpjs_kesehatan: '1234567890123',
    no_bpjs_ketenagakerjaan: '3210987654321',
    alamat_domisili: 'Jl. Mawar No. 8, Surabaya',
    tanggal_masuk: '2017-01-10',
    status_kepegawaian: 'Permanen',
    jenis_status: 'Permanen',
    akhir_kontrak: null,
    no_hp: '081234560001',
    telepon_2: '081298776543',
    email: 'admin@gmail.com',
    password: 'admin123',
    pendidikan_terakhir: 'S1 Psikologi',
    pekerjaan_terakhir: 'Staff HR',
    golongan_darah: 'O',
    no_rekening: '123456789012',
    nama_rekening: 'Amelia Kusuma',
    bank_rekening: 'BCA',
    tanggungan_keluarga: '3',
    susunan_keluarga: 'Suami, Anak 1, Anak 2',
    anak_ke: '1',
    jumlah_saudara: '3',
    sepatu_safety: '39',
    ukuran_baju: 'M',
    ukuran_celana: '30',
    ahli_waris_nama: 'Adi Putra',
    ahli_waris_tempat_lahir: 'Surabaya',
    ahli_waris_tanggal_lahir: '1990-11-10',
    ahli_waris_hubungan: 'Suami',
    ahli_waris_alamat: 'Jl. Mawar No. 8, Surabaya',
    ahli_waris_telepon: '081245678900',
    kontak_darurat_1_nama: 'Rina Kusuma',
    kontak_darurat_1_hubungan: 'Kakak',
    kontak_darurat_1_alamat: 'Jl. Melati No. 5, Surabaya',
    kontak_darurat_1_telepon: '081234567891',
    kontak_darurat_2_nama: 'Sari Wulandari',
    kontak_darurat_2_hubungan: 'Teman',
    kontak_darurat_2_alamat: 'Jl. Kenanga No. 7, Surabaya',
    kontak_darurat_2_telepon: '081255667788',
    berkas_ktp: 'amelia-ktp.pdf',
    berkas_kk: 'amelia-kk.pdf',
    berkas_npwp: 'amelia-npwp.pdf',
    berkas_bpjs_jkn: 'amelia-bpjs-jkn.pdf',
    berkas_bpjs_jht: 'amelia-bpjs-jht.pdf'
  });
}

const pegawaiDemo = pegawaiData.find((pegawai) => pegawai.id === 2);
if (pegawaiDemo) {
  Object.assign(pegawaiDemo, {
    nrp: formatNrp(2),
    nama_lengkap: 'Rizky Saputra',
    jabatan: 'Staff Operasional',
    pas_foto: 'rizky-saputra.jpg',
    tempat_lahir: 'Malang',
    tanggal_lahir: '1994-05-12',
    alamat_ktp: 'Jl. Pahlawan No. 45, Malang',
    tinggi_badan: '172',
    berat_badan: '70',
    agama: 'Islam',
    status_pernikahan: 'Menikah',
    tanggal_pernikahan: '2020-04-17',
    no_ktp: '3579021205940002',
    no_kk: '3579021509940003',
    no_npwp: '57.890.123.4-006.000',
    no_bpjs_kesehatan: '2234567890123',
    no_bpjs_ketenagakerjaan: '4210987654321',
    alamat_domisili: 'Jl. Veteran No. 9, Malang',
    tanggal_masuk: '2019-04-01',
    status_kepegawaian: 'Kontrak',
    jenis_status: 'Kontrak 2',
    akhir_kontrak: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    no_hp: '081245678900',
    telepon_2: '082145678900',
    email: 'pegawai@gmail.com',
    password: 'pegawai123',
    pendidikan_terakhir: 'D3 Teknik Mesin',
    pekerjaan_terakhir: 'Operator Lapangan',
    golongan_darah: 'A',
    no_rekening: '223456789012',
    nama_rekening: 'Rizky Saputra',
    bank_rekening: 'BRI',
    tanggungan_keluarga: '2',
    susunan_keluarga: 'Istri, Anak 1',
    anak_ke: '2',
    jumlah_saudara: '3',
    sepatu_safety: '41',
    ukuran_baju: 'L',
    ukuran_celana: '32',
    ahli_waris_nama: 'Nadya Salsabila',
    ahli_waris_tempat_lahir: 'Malang',
    ahli_waris_tanggal_lahir: '1995-09-21',
    ahli_waris_hubungan: 'Istri',
    ahli_waris_alamat: 'Jl. Veteran No. 9, Malang',
    ahli_waris_telepon: '081345678912',
    kontak_darurat_1_nama: 'Deni Saputra',
    kontak_darurat_1_hubungan: 'Adik',
    kontak_darurat_1_alamat: 'Jl. Merdeka No. 3, Malang',
    kontak_darurat_1_telepon: '081278945612',
    kontak_darurat_2_nama: 'Bayu Siregar',
    kontak_darurat_2_hubungan: 'Teman',
    kontak_darurat_2_alamat: 'Jl. Ahmad Yani No. 10, Malang',
    kontak_darurat_2_telepon: '081377889900',
    berkas_ktp: 'rizky-ktp.pdf',
    berkas_kk: 'rizky-kk.pdf',
    berkas_npwp: 'rizky-npwp.pdf',
    berkas_bpjs_jkn: 'rizky-bpjs-jkn.pdf',
    berkas_bpjs_jht: 'rizky-bpjs-jht.pdf'
  });
}

const pegawaiFinance = pegawaiData.find((pegawai) => pegawai.id === 3);
if (pegawaiFinance) {
  Object.assign(pegawaiFinance, {
    nrp: formatNrp(3),
    nama_lengkap: 'Nadia Finance',
    jabatan: 'Admin Finance',
    pas_foto: 'nadia-finance.jpg',
    tempat_lahir: 'Jakarta',
    tanggal_lahir: '1991-07-22',
    alamat_ktp: 'Jl. Cendana No. 7, Jakarta',
    tinggi_badan: '165',
    berat_badan: '55',
    agama: 'Kristen',
    status_pernikahan: 'Lajang',
    tanggal_pernikahan: null,
    no_ktp: '3175042207910003',
    no_kk: '3175040608910003',
    no_npwp: '68.901.234.5-007.000',
    no_bpjs_kesehatan: '3234567890123',
    no_bpjs_ketenagakerjaan: '5210987654321',
    alamat_domisili: 'Jl. Kemang Raya No. 3, Jakarta',
    tanggal_masuk: '2016-09-15',
    status_kepegawaian: 'Permanen',
    jenis_status: 'Permanen',
    akhir_kontrak: null,
    no_hp: '081234560003',
    telepon_2: '081298761234',
    email: 'finance@gmail.com',
    password: 'finance123',
    pendidikan_terakhir: 'S1 Akuntansi',
    pekerjaan_terakhir: 'Akuntan Junior',
    golongan_darah: 'AB',
    no_rekening: '323456789012',
    nama_rekening: 'Nadia Finance',
    bank_rekening: 'Mandiri',
    tanggungan_keluarga: '1',
    susunan_keluarga: 'Ibu',
    anak_ke: '2',
    jumlah_saudara: '2',
    sepatu_safety: '38',
    ukuran_baju: 'S',
    ukuran_celana: '28',
    ahli_waris_nama: 'Maria Sari',
    ahli_waris_tempat_lahir: 'Jakarta',
    ahli_waris_tanggal_lahir: '1968-01-15',
    ahli_waris_hubungan: 'Ibu',
    ahli_waris_alamat: 'Jl. Kemang Raya No. 3, Jakarta',
    ahli_waris_telepon: '081355667788',
    kontak_darurat_1_nama: 'Rani Finance',
    kontak_darurat_1_hubungan: 'Kakak',
    kontak_darurat_1_alamat: 'Jl. Cikini No. 8, Jakarta',
    kontak_darurat_1_telepon: '081267891234',
    kontak_darurat_2_nama: 'Sinta Lestari',
    kontak_darurat_2_hubungan: 'Sahabat',
    kontak_darurat_2_alamat: 'Jl. Senopati No. 5, Jakarta',
    kontak_darurat_2_telepon: '081233445566',
    berkas_ktp: 'nadia-ktp.pdf',
    berkas_kk: 'nadia-kk.pdf',
    berkas_npwp: 'nadia-npwp.pdf',
    berkas_bpjs_jkn: 'nadia-bpjs-jkn.pdf',
    berkas_bpjs_jht: 'nadia-bpjs-jht.pdf'
  });
}

const pegawaiOfficer = pegawaiData.find((pegawai) => pegawai.id === 4);
if (pegawaiOfficer) {
  Object.assign(pegawaiOfficer, {
    nrp: formatNrp(4),
    nama_lengkap: 'Bima Officer',
    jabatan: 'Officer Site Senior',
    pas_foto: 'bima-officer.jpg',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1989-11-05',
    alamat_ktp: 'Jl. Dago No. 89, Bandung',
    tinggi_badan: '178',
    berat_badan: '80',
    agama: 'Islam',
    status_pernikahan: 'Menikah',
    tanggal_pernikahan: '2012-03-10',
    no_ktp: '3273040511890004',
    no_kk: '3273041205890004',
    no_npwp: '79.012.345.6-008.000',
    no_bpjs_kesehatan: '4234567890123',
    no_bpjs_ketenagakerjaan: '6210987654321',
    alamat_domisili: 'Jl. Ciumbuleuit No. 14, Bandung',
    tanggal_masuk: '2014-02-20',
    status_kepegawaian: 'Permanen',
    jenis_status: 'Permanen',
    akhir_kontrak: null,
    no_hp: '081234560004',
    telepon_2: '081299776655',
    email: 'officer@gmail.com',
    password: 'officer123',
    pendidikan_terakhir: 'S1 Teknik Industri',
    pekerjaan_terakhir: 'Supervisor Site',
    golongan_darah: 'B',
    no_rekening: '423456789012',
    nama_rekening: 'Bima Officer',
    bank_rekening: 'BNI',
    tanggungan_keluarga: '4',
    susunan_keluarga: 'Istri, Anak 1, Anak 2, Anak 3',
    anak_ke: '1',
    jumlah_saudara: '4',
    sepatu_safety: '43',
    ukuran_baju: 'XL',
    ukuran_celana: '34',
    ahli_waris_nama: 'Laras Bima',
    ahli_waris_tempat_lahir: 'Bandung',
    ahli_waris_tanggal_lahir: '1990-07-12',
    ahli_waris_hubungan: 'Istri',
    ahli_waris_alamat: 'Jl. Ciumbuleuit No. 14, Bandung',
    ahli_waris_telepon: '081356789012',
    kontak_darurat_1_nama: 'Arif Officer',
    kontak_darurat_1_hubungan: 'Adik',
    kontak_darurat_1_alamat: 'Jl. Dipatiukur No. 3, Bandung',
    kontak_darurat_1_telepon: '081244556677',
    kontak_darurat_2_nama: 'Gilang Pamungkas',
    kontak_darurat_2_hubungan: 'Teman',
    kontak_darurat_2_alamat: 'Jl. Sumatera No. 2, Bandung',
    kontak_darurat_2_telepon: '081377665544',
    berkas_ktp: 'bima-ktp.pdf',
    berkas_kk: 'bima-kk.pdf',
    berkas_npwp: 'bima-npwp.pdf',
    berkas_bpjs_jkn: 'bima-bpjs-jkn.pdf',
    berkas_bpjs_jht: 'bima-bpjs-jht.pdf'
  });
}

pegawaiData.forEach((pegawai) => {
  syncCredentialForPegawai(pegawai);
});

const credentialToManagedAccount = (credential: Credential): ManagedAccount | null => {
  const { user } = credential;
  if (!user.pegawaiId) {
    return null;
  }
  const pegawai = pegawaiData.find((item) => item.id === user.pegawaiId);
  if (!pegawai) {
    return null;
  }
  const roles = normalizeAssignableRoles(user.roles ?? [user.role]);
  credential.user.roles = roles;
  return {
    id: user.id,
    pegawaiId: user.pegawaiId,
    nama: pegawai.nama_lengkap,
    nrp: pegawai.nrp,
    email: user.email ?? pegawai.email ?? '',
    password: credential.password,
    roles
  };
};

const getManagedAccounts = (): ManagedAccount[] => {
  return credentials
    .map((credential) => credentialToManagedAccount(credential))
    .filter((account): account is ManagedAccount => Boolean(account));
};

const updateCredentialRoles = (credential: Credential, roles: UserRole[]): ManagedAccount | null => {
  if (credential.user.role === 'superadmin') {
    return null;
  }
  const normalized = normalizeAssignableRoles(Array.isArray(roles) ? roles : []);
  credential.user.roles = normalized;
  if (!normalized.includes(credential.user.role)) {
    credential.user.role = 'pegawai';
  }
  refreshSessionsForUser(credential.user.id, normalized);
  return credentialToManagedAccount(credential);
};

const aktivitasData: Aktivitas[] = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  judul: `Aktivitas ${index + 1}`,
  deskripsi: 'Perubahan data pegawai melalui AMK PORTAL.',
  waktu: new Date(Date.now() - index * 60 * 60 * 1000).toISOString()
}));

export const initMockServer = (http: AxiosInstance) => {
  const mock = new MockAdapter(http, { delayResponse: 300 });

  mock.onPost('/api/login').reply((config: AxiosRequestConfig) => {
    const payload = JSON.parse(config.data ?? '{}');
    const identifier = String(payload.nrp ?? '').trim().toLowerCase();
    const password = String(payload.password ?? '').trim();

    const credential = credentials.find((cred) =>
      cred.identifiers.some((value) => value.toLowerCase() === identifier)
    );

    if (!credential || credential.password !== password) {
      return [401, { message: 'NRP atau kata sandi tidak sesuai.' }];
    }

    let roles: UserRole[];
    if (credential.user.role === 'superadmin') {
      const unique = new Set<UserRole>(credential.user.roles ?? ['superadmin']);
      unique.add('superadmin');
      roles = Array.from(unique);
    } else {
      roles = normalizeAssignableRoles(credential.user.roles ?? [credential.user.role]);
      credential.user.role = roles.includes(credential.user.role) ? credential.user.role : 'pegawai';
    }
    credential.user.roles = roles;

    const sessionUser: User = {
      ...credential.user,
      roles
    };

    const token = `mock-token-${sessionUser.role}-${sessionUser.id}`;
    sessions.set(token, clone(sessionUser));

    const response: AuthResponse = {
      token,
      user: clone(sessionUser)
    };

    return [200, response];
  });

  mock.onPost('/api/logout').reply((config: AxiosRequestConfig) => {
    const session = resolveSession(config);
    if (session) {
      sessions.delete(session.token);
    }
    return [204];
  });

  mock.onPost('/api/auth/switch-role').reply((config: AxiosRequestConfig) => {
    const session = resolveSession(config);
    if (!session) {
      return [401, { message: 'Tidak terautentikasi.' }];
    }

    const payload = JSON.parse(config.data ?? '{}');
    const role = String(payload.role ?? '').trim() as UserRole;

    if (!role) {
      return [422, { message: 'Role tujuan wajib diisi.' }];
    }

    const roles = session.user.roles ?? [session.user.role];
    if (!roles.includes(role)) {
      return [403, { message: 'Role tidak tersedia untuk akun ini.' }];
    }

    const storedUser = sessions.get(session.token);
    if (!storedUser) {
      return [401, { message: 'Sesi tidak ditemukan.' }];
    }

    const updatedUser: User = {
      ...storedUser,
      role,
      roles: storedUser.roles ?? [storedUser.role]
    };

    sessions.set(session.token, updatedUser);

    return [200, { user: clone(updatedUser) }];
  });

  mock.onPost('/api/auth/verify-password').reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['admin_hcgs']);
    if (!guard.ok) return guard.response;

    const payload = JSON.parse(config.data ?? '{}');
    const password = String(payload.password ?? '').trim();

    if (!password) {
      return [422, { message: 'Kata sandi wajib diisi.' }];
    }

    const credential = credentials.find((cred) => cred.user.id === guard.session.user.id);
    if (!credential) {
      return [404, { message: 'Akun tidak ditemukan.' }];
    }

    if (credential.password !== password) {
      return [401, { message: 'Kata sandi tidak sesuai.' }];
    }

    return [200, { valid: true }];
  });

  mock.onGet('/api/superadmin/accounts').reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['superadmin']);
    if (!guard.ok) return guard.response;

    const accounts = getManagedAccounts();
    return [200, clone(accounts)];
  });

  mock.onPut(/\/api\/superadmin\/accounts\/\d+\/roles$/).reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['superadmin']);
    if (!guard.ok) return guard.response;

    const match = config.url?.match(/\/api\/superadmin\/accounts\/(\d+)\/roles$/);
    const id = match ? Number(match[1]) : NaN;
    if (Number.isNaN(id)) {
      return [400, { message: 'ID akun tidak valid.' }];
    }

    const payload = JSON.parse(config.data ?? '{}');
    const incomingRoles = Array.isArray(payload.roles) ? payload.roles : [];
    const filteredRoles = incomingRoles.filter((role: unknown): role is UserRole => typeof role === 'string');

    const credential = credentials.find((cred) => cred.user.id === id);
    if (!credential || !credential.user.pegawaiId) {
      return [404, { message: 'Akun pegawai tidak ditemukan.' }];
    }

    const updatedAccount = updateCredentialRoles(credential, filteredRoles) ?? credentialToManagedAccount(credential);
    if (!updatedAccount) {
      return [500, { message: 'Gagal memperbarui role akun.' }];
    }

    return [200, clone(updatedAccount)];
  });

  mock.onPut(/\/api\/superadmin\/accounts\/\d+\/credentials$/).reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['superadmin']);
    if (!guard.ok) return guard.response;

    const match = config.url?.match(/\/api\/superadmin\/accounts\/(\d+)\/credentials$/);
    const id = match ? Number(match[1]) : NaN;
    if (Number.isNaN(id)) {
      return [400, { message: 'ID akun tidak valid.' }];
    }

    const payload = JSON.parse(config.data ?? '{}');
    const email = typeof payload.email === 'string' ? payload.email.trim() : '';
    const password = typeof payload.password === 'string' ? payload.password.trim() : '';

    if (!email || !password) {
      return [422, { message: 'Email dan kata sandi wajib diisi.' }];
    }

    const credential = credentials.find((cred) => cred.user.id === id && cred.user.pegawaiId);
    if (!credential || !credential.user.pegawaiId) {
      return [404, { message: 'Akun pegawai tidak ditemukan.' }];
    }

    const pegawai = pegawaiData.find((item) => item.id === credential.user.pegawaiId);
    if (!pegawai) {
      return [404, { message: 'Data pegawai tidak ditemukan.' }];
    }

    const previousSnapshot = { email: pegawai.email, nrp: pegawai.nrp };

    pegawai.email = email;
    pegawai.password = password;
    pegawai.updated_at = new Date().toISOString();

    const updatedCredential = syncCredentialForPegawai(pegawai, previousSnapshot);
    const account = updatedCredential ? credentialToManagedAccount(updatedCredential) : null;
    if (!account) {
      return [500, { message: 'Gagal memperbarui kredensial.' }];
    }

    return [200, clone(account)];
  });

  mock.onGet('/api/profil').reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config);
    if (!guard.ok) return guard.response;
    return [200, guard.session.user];
  });

  mock.onGet('/api/pegawai').reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['admin_hcgs']);
    if (!guard.ok) return guard.response;

    const params = config.params || {};
    const search = (params.search as string | undefined)?.toLowerCase() ?? '';
    const page = Number(params.page ?? 1);
    const perPage = Number(params.per_page ?? 10);
    const sort = (params.sort as string | undefined) ?? 'default';
    const status = (params.status as string | undefined) ?? 'all';

    const filtered = pegawaiData
      .filter((item) =>
        item.nrp.toLowerCase().includes(search) || item.nama_lengkap.toLowerCase().includes(search)
      )
      .filter((item) => (status === 'all' ? true : item.jenis_status === status));

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'contract-expiring': {
          const aTime = a.akhir_kontrak ? new Date(a.akhir_kontrak).getTime() : Number.POSITIVE_INFINITY;
          const bTime = b.akhir_kontrak ? new Date(b.akhir_kontrak).getTime() : Number.POSITIVE_INFINITY;
          return aTime - bTime;
        }
        case 'nrp':
          return a.nrp.localeCompare(b.nrp);
        case 'nama-desc':
          return b.nama_lengkap.localeCompare(a.nama_lengkap);
        case 'nama-asc':
          return a.nama_lengkap.localeCompare(b.nama_lengkap);
        default:
          return 0;
      }
    });

    const start = (page - 1) * perPage;
    const paginated = sorted.slice(start, start + perPage);

    return [200, {
      data: clone(paginated),
      meta: {
        total: sorted.length,
        per_page: perPage,
        current_page: page
      }
    }];
  });

  mock.onGet(/\/api\/pegawai\/\d+$/).reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['admin_hcgs']);
    if (!guard.ok) return guard.response;

    const id = Number(config.url?.split('/').pop());
    const item = pegawaiData.find((pegawai) => pegawai.id === id);
    if (!item) {
      return [404, { message: 'Pegawai tidak ditemukan.' }];
    }
    return [200, clone(item)];
  });

  mock.onPost('/api/pegawai').reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['admin_hcgs']);
    if (!guard.ok) return guard.response;

    const payload = JSON.parse(config.data ?? '{}');
    const email = typeof payload.email === 'string' ? payload.email.trim() : '';
    const password = typeof payload.password === 'string' ? payload.password.trim() : '';

    if (!email || !password) {
      return [422, { message: 'Email dan kata sandi wajib diisi.' }];
    }

    const id = pegawaiData.length + 1;
    const timestamp = new Date().toISOString();
    const statusKepegawaian = payload.status_kepegawaian === 'Permanen' ? 'Permanen' : 'Kontrak';
    const jenisStatus = normalizeJenisStatus(payload.jenis_status, statusKepegawaian);
    const akhirKontrak = statusKepegawaian === 'Permanen' ? null : payload.akhir_kontrak ?? null;
    const base = defaultPegawaiFields();
    const sanitizedPayload = { ...base, ...payload };
    const normalizedNrp =
      typeof sanitizedPayload.nrp === 'string' && sanitizedPayload.nrp.trim()
        ? sanitizedPayload.nrp.trim().toUpperCase()
        : formatNrp(id);
    sanitizedPayload.nrp = normalizedNrp;

    const newPegawai: Pegawai = {
      ...sanitizedPayload,
      id,
      nrp: normalizedNrp,
      status_kepegawaian: statusKepegawaian,
      jenis_status: jenisStatus,
      akhir_kontrak: akhirKontrak,
      email,
      password,
      tanggal_pernikahan:
        sanitizedPayload.status_pernikahan === 'Menikah' ? sanitizedPayload.tanggal_pernikahan ?? null : null,
      created_at: timestamp,
      updated_at: timestamp
    };
    pegawaiData.push(newPegawai);
    syncCredentialForPegawai(newPegawai);
    return [201, clone(newPegawai)];
  });

  mock.onPut(/\/api\/pegawai\/\d+$/).reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['admin_hcgs']);
    if (!guard.ok) return guard.response;

    const id = Number(config.url?.split('/').pop());
    const payload = JSON.parse(config.data ?? '{}');
    const index = pegawaiData.findIndex((pegawai) => pegawai.id === id);
    if (index === -1) {
      return [404, { message: 'Pegawai tidak ditemukan.' }];
    }
    const existing = pegawaiData[index];
    const previousSnapshot = { email: existing.email, nrp: existing.nrp };
    const updates: Partial<Pegawai> = { ...payload };
    if (typeof updates.nrp === 'string') {
      const trimmedNrp = updates.nrp.trim();
      if (trimmedNrp) {
        updates.nrp = trimmedNrp.toUpperCase();
      } else {
        delete updates.nrp;
      }
    }
    if (typeof updates.email === 'string') {
      const trimmed = updates.email.trim();
      updates.email = trimmed || existing.email;
    }
    if (typeof updates.password === 'string') {
      const trimmedPass = updates.password.trim();
      if (trimmedPass) {
        updates.password = trimmedPass;
      } else {
        delete updates.password;
      }
    }
    const normalizedStatus =
      updates.status_kepegawaian === 'Permanen'
        ? 'Permanen'
        : updates.status_kepegawaian === 'Kontrak'
        ? 'Kontrak'
        : existing.status_kepegawaian;
    const jenisStatus = normalizeJenisStatus(
      updates.jenis_status ?? existing.jenis_status,
      normalizedStatus
    );
    const akhirKontrak = normalizedStatus === 'Permanen' ? null : updates.akhir_kontrak ?? existing.akhir_kontrak;

    const merged = { ...defaultPegawaiFields(), ...existing, ...updates };

    const updated: Pegawai = {
      ...merged,
      id: existing.id,
      status_kepegawaian: normalizedStatus,
      jenis_status: jenisStatus,
      akhir_kontrak: akhirKontrak,
      tanggal_pernikahan:
        merged.status_pernikahan === 'Menikah' ? merged.tanggal_pernikahan ?? null : null,
      created_at: existing.created_at,
      updated_at: new Date().toISOString()
    };
    pegawaiData[index] = updated;
    syncCredentialForPegawai(updated, previousSnapshot);
    return [200, clone(updated)];
  });

  mock.onDelete(/\/api\/pegawai\/\d+$/).reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['admin_hcgs']);
    if (!guard.ok) return guard.response;

    const id = Number(config.url?.split('/').pop());
    const index = pegawaiData.findIndex((pegawai) => pegawai.id === id);
    if (index === -1) {
      return [404, { message: 'Pegawai tidak ditemukan.' }];
    }
    pegawaiData.splice(index, 1);
    const credentialIndex = credentials.findIndex((credential) => credential.user.pegawaiId === id);
    if (credentialIndex !== -1) {
      const credential = credentials[credentialIndex];
      sessions.forEach((sessionUser, token) => {
        if (sessionUser.id === credential.user.id) {
          sessions.delete(token);
        }
      });
      credentials.splice(credentialIndex, 1);
    }
    return [204];
  });

  mock.onGet('/api/pegawai/me').reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['pegawai']);
    if (!guard.ok) return guard.response;

    const pegawaiId = guard.session.user.pegawaiId;
    if (!pegawaiId) {
      return [404, { message: 'Data pegawai tidak ditemukan.' }];
    }

    const item = pegawaiData.find((pegawai) => pegawai.id === pegawaiId);
    if (!item) {
      return [404, { message: 'Data pegawai tidak ditemukan.' }];
    }

    return [200, clone(item)];
  });

  mock.onPut('/api/pegawai/me').reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['pegawai']);
    if (!guard.ok) return guard.response;

    const pegawaiId = guard.session.user.pegawaiId;
    if (!pegawaiId) {
      return [404, { message: 'Data pegawai tidak ditemukan.' }];
    }

    const index = pegawaiData.findIndex((pegawai) => pegawai.id === pegawaiId);
    if (index === -1) {
      return [404, { message: 'Data pegawai tidak ditemukan.' }];
    }

    const payload = JSON.parse(config.data ?? '{}');
    const allowedFields: Array<keyof Pegawai> = [
      'pas_foto',
      'email',
      'password',
      'nama_lengkap',
      'jabatan',
      'tempat_lahir',
      'tanggal_lahir',
      'tinggi_badan',
      'berat_badan',
      'agama',
      'status_pernikahan',
      'tanggal_pernikahan',
      'no_ktp',
      'no_kk',
      'no_npwp',
      'no_bpjs_kesehatan',
      'no_bpjs_ketenagakerjaan',
      'alamat_ktp',
      'alamat_domisili',
      'no_hp',
      'telepon_2',
      'pendidikan_terakhir',
      'pekerjaan_terakhir',
      'golongan_darah',
      'no_rekening',
      'nama_rekening',
      'bank_rekening',
      'tanggungan_keluarga',
      'susunan_keluarga',
      'anak_ke',
      'jumlah_saudara',
      'sepatu_safety',
      'ukuran_baju',
      'ukuran_celana',
      'ahli_waris_nama',
      'ahli_waris_tempat_lahir',
      'ahli_waris_tanggal_lahir',
      'ahli_waris_hubungan',
      'ahli_waris_alamat',
      'ahli_waris_telepon',
      'kontak_darurat_1_nama',
      'kontak_darurat_1_hubungan',
      'kontak_darurat_1_alamat',
      'kontak_darurat_1_telepon',
      'kontak_darurat_2_nama',
      'kontak_darurat_2_hubungan',
      'kontak_darurat_2_alamat',
      'kontak_darurat_2_telepon',
      'berkas_ktp',
      'berkas_kk',
      'berkas_npwp',
      'berkas_bpjs_jkn',
      'berkas_bpjs_jht',
      'jenis_status',
      'akhir_kontrak'
    ];

    const updated: Pegawai = {
      ...pegawaiData[index],
      updated_at: new Date().toISOString()
    };

    allowedFields.forEach((field) => {
      if (field in payload) {
        (updated as any)[field] = payload[field];
      }
    });

    pegawaiData[index] = updated;

    return [200, clone(updated)];
  });

  mock.onGet('/api/pegawai/statistik').reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config, ['admin_hcgs']);
    if (!guard.ok) return guard.response;

    const jumlahPegawai = pegawaiData.length;
    const lengkap = Math.round(jumlahPegawai * 0.78);
    const habisKontrak = pegawaiData
      .filter((pegawai) => pegawai.akhir_kontrak)
      .sort((a, b) => (a.akhir_kontrak ?? '').localeCompare(b.akhir_kontrak ?? ''))
      .slice(0, 5);

    const response: StatistikResponse = {
      jumlahPegawai,
      persentaseLengkap: Math.round((lengkap / Math.max(jumlahPegawai, 1)) * 100),
      habisKontrak: clone(habisKontrak)
    };

    return [200, response];
  });

  mock.onGet('/api/aktivitas').reply((config: AxiosRequestConfig) => {
    const guard = requireAuth(config);
    if (!guard.ok) return guard.response;

    const limit = Number(config.params?.limit ?? aktivitasData.length);
    return [200, clone(aktivitasData.slice(0, limit))];
  });

  return mock;
};
