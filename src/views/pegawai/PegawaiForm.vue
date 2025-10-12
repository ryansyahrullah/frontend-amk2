<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">{{ title }}</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Lengkapi informasi pegawai sesuai data resmi perusahaan.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="ghost" @click="kembali">Batal</Button>
        <Button :loading="loadingSubmit" @click="submitForm">Simpan</Button>
      </div>
    </div>

    <form class="space-y-6" @submit.prevent="submitForm">
      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header class="mb-6 flex flex-col gap-1">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Kategori Akun</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Kelola akses AMK PORTAL pegawai. Hanya bagian ini yang wajib diisi saat menambah pegawai baru.
          </p>
        </header>
        <div class="grid gap-6 md:grid-cols-2">
          <InputText v-model="form.nrp" label="NRP" placeholder="Contoh: AMK122001" :error="errors.nrp" />
          <InputText v-model="form.email" label="Alamat Email" placeholder="contoh@perusahaan.com" :error="errors.email" />
          <InputText v-model="form.password" label="Kata Sandi AMK PORTAL" placeholder="Minimal 4 karakter" :error="errors.password" />
          <InputDate v-model="form.tanggal_masuk" label="Tanggal Masuk" :error="errors.tanggal_masuk" />
          <InputSelect
            v-model="form.status_kepegawaian"
            label="Status Kepegawaian"
            :options="statusOptions"
            :error="errors.status_kepegawaian"
          />
          <InputSelect
            v-if="form.status_kepegawaian === 'Kontrak'"
            v-model="form.jenis_status"
            label="Jenis Kontrak"
            :options="kontrakOptions"
            :error="errors.jenis_status"
          />
          <InputDate
            v-model="form.akhir_kontrak"
            label="Akhir Kontrak"
            :error="errors.akhir_kontrak"
            :hint="form.status_kepegawaian === 'Kontrak' ? 'Wajib diisi untuk pegawai kontrak.' : 'Tidak wajib untuk pegawai permanen.'"
            :disabled="form.status_kepegawaian === 'Permanen'"
          />
        </div>
      </section>

      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header class="mb-6 flex flex-col gap-1">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">A. Identitas Pegawai</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Data dasar pegawai untuk kebutuhan administrasi.</p>
        </header>
        <div class="grid gap-6 md:grid-cols-2">
          <InputFile
            v-model="form.pas_foto"
            label="Pas Foto 3x4"
            placeholder="Belum diunggah"
            :error="errors.pas_foto"
            preview
            preview-kind="image"
            preview-label="Pas Foto 3x4"
          />
          <InputText v-model="form.nama_lengkap" label="Nama Lengkap" placeholder="Masukkan nama lengkap" :error="errors.nama_lengkap" />
          <InputSelect
            v-model="form.jabatan"
            label="Jabatan"
            placeholder="Pilih jabatan"
            :options="jabatanOptions"
            :error="errors.jabatan"
            searchable
          />
          <InputText v-model="form.tempat_lahir" label="Tempat Lahir" placeholder="Contoh: Surabaya" :error="errors.tempat_lahir" />
          <InputDate v-model="form.tanggal_lahir" label="Tanggal Lahir" :error="errors.tanggal_lahir" />
          <InputTextarea v-model="form.alamat_ktp" label="Alamat Sesuai KTP" placeholder="Masukkan alamat sesuai KTP" :rows="3" :error="errors.alamat_ktp" class="md:col-span-2" />
          <InputText v-model="form.tinggi_badan" label="Tinggi Badan (cm)" placeholder="Contoh: 170" :error="errors.tinggi_badan" />
          <InputText v-model="form.berat_badan" label="Berat Badan (kg)" placeholder="Contoh: 65" :error="errors.berat_badan" />
          <InputText v-model="form.agama" label="Agama/Kepercayaan" placeholder="Contoh: Islam" :error="errors.agama" />
          <InputSelect
            v-model="form.status_pernikahan"
            label="Status Pernikahan"
            placeholder="Pilih status"
            :options="statusPernikahanOptions"
            :error="errors.status_pernikahan"
          />
          <InputDate
            v-model="form.tanggal_pernikahan"
            label="Tanggal Pernikahan"
            :disabled="form.status_pernikahan !== 'Menikah'"
            :error="errors.tanggal_pernikahan"
            hint="Isi jika status menikah"
          />
          <InputText v-model="form.no_ktp" label="No KTP" placeholder="Masukkan nomor KTP" :error="errors.no_ktp" />
          <InputText v-model="form.no_kk" label="No Kartu Keluarga" placeholder="Masukkan nomor KK" :error="errors.no_kk" />
          <InputText v-model="form.no_npwp" label="Nomor NPWP" placeholder="Masukkan nomor NPWP" :error="errors.no_npwp" />
          <InputText v-model="form.no_bpjs_kesehatan" label="No BPJS Kesehatan" placeholder="Masukkan nomor BPJS" :error="errors.no_bpjs_kesehatan" />
          <InputText v-model="form.no_bpjs_ketenagakerjaan" label="No BPJS Ketenagakerjaan" placeholder="Masukkan nomor BPJS" :error="errors.no_bpjs_ketenagakerjaan" />
          <InputTextarea v-model="form.alamat_domisili" label="Alamat Domisili" placeholder="Masukkan alamat domisili" :rows="3" :error="errors.alamat_domisili" class="md:col-span-2" />
          <InputText v-model="form.no_hp" label="Telepon 1" placeholder="0812xxxxxxx" :error="errors.no_hp" />
          <InputText v-model="form.telepon_2" label="Telepon 2" placeholder="Opsional" :error="errors.telepon_2" />
          <InputText v-model="form.pendidikan_terakhir" label="Pendidikan Terakhir" placeholder="Contoh: S1 Manajemen" :error="errors.pendidikan_terakhir" />
          <InputText v-model="form.pekerjaan_terakhir" label="Pekerjaan Terakhir" placeholder="Masukkan riwayat pekerjaan" :error="errors.pekerjaan_terakhir" />
          <InputSelect
            v-model="form.golongan_darah"
            label="Golongan Darah"
            placeholder="Pilih golongan darah"
            :options="golonganDarahOptions"
            :error="errors.golongan_darah"
          />
          <InputText v-model="form.no_rekening" label="No Rekening" placeholder="Masukkan nomor rekening" :error="errors.no_rekening" />
          <InputText v-model="form.nama_rekening" label="Nama Rekening" placeholder="Masukkan nama pemilik rekening" :error="errors.nama_rekening" />
          <InputText v-model="form.bank_rekening" label="Bank Rekening" placeholder="Contoh: BCA" :error="errors.bank_rekening" />
        </div>
      </section>

      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header class="mb-6 flex flex-col gap-1">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">B. Susunan Keluarga</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Informasi keluarga inti untuk kebutuhan administrasi.</p>
        </header>
        <div class="grid gap-6 md:grid-cols-2">
          <InputText v-model="form.tanggungan_keluarga" label="Tanggungan Keluarga (orang)" placeholder="Contoh: 3" :error="errors.tanggungan_keluarga" />
          <InputText v-model="form.anak_ke" label="Anak Nomor Ke" placeholder="Contoh: 2" :error="errors.anak_ke" />
          <InputText v-model="form.jumlah_saudara" label="Berapa Bersaudara" placeholder="Contoh: 4" :error="errors.jumlah_saudara" />
          <InputTextarea v-model="form.susunan_keluarga" label="Jelaskan terdiri dari siapa saja" placeholder="Tuliskan anggota keluarga" :rows="3" :error="errors.susunan_keluarga" class="md:col-span-2" />
        </div>
      </section>

      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header class="mb-6 flex flex-col gap-1">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">C. Ukuran Sepatu dan Baju Kerja</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Pastikan ukuran sesuai kebutuhan perlengkapan kerja.</p>
        </header>
        <div class="grid gap-6 md:grid-cols-3">
          <InputSelect
            v-model="form.sepatu_safety"
            label="Sepatu Safety"
            placeholder="Pilih ukuran"
            :options="sepatuOptions"
            :error="errors.sepatu_safety"
          />
          <InputSelect
            v-model="form.ukuran_baju"
            label="Ukuran Baju"
            placeholder="Pilih ukuran"
            :options="ukuranBajuOptions"
            :error="errors.ukuran_baju"
          />
          <InputSelect
            v-model="form.ukuran_celana"
            label="Ukuran Celana"
            placeholder="Pilih ukuran"
            :options="ukuranCelanaOptions"
            :error="errors.ukuran_celana"
          />
        </div>
      </section>

      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header class="mb-6 flex flex-col gap-1">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">D. Ahli Waris</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Lengkapi data ahli waris untuk keperluan klaim.</p>
        </header>
        <div class="grid gap-6 md:grid-cols-2">
          <InputText v-model="form.ahli_waris_nama" label="Nama" placeholder="Masukkan nama ahli waris" :error="errors.ahli_waris_nama" />
          <InputText v-model="form.ahli_waris_hubungan" label="Hubungan Keluarga" placeholder="Contoh: Istri" :error="errors.ahli_waris_hubungan" />
          <InputText v-model="form.ahli_waris_tempat_lahir" label="Tempat Lahir" placeholder="Contoh: Jakarta" :error="errors.ahli_waris_tempat_lahir" />
          <InputDate v-model="form.ahli_waris_tanggal_lahir" label="Tanggal Lahir" :error="errors.ahli_waris_tanggal_lahir" />
          <InputTextarea v-model="form.ahli_waris_alamat" label="Alamat" placeholder="Masukkan alamat ahli waris" :rows="3" :error="errors.ahli_waris_alamat" class="md:col-span-2" />
          <InputText v-model="form.ahli_waris_telepon" label="Telepon" placeholder="0812xxxxxxx" :error="errors.ahli_waris_telepon" />
        </div>
      </section>

      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header class="mb-6 flex flex-col gap-1">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">E. Kontak Darurat</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Masukkan dua kontak saudara/kenalan yang dapat dihubungi.</p>
        </header>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">Kontak Darurat 1</p>
            <InputText v-model="form.kontak_darurat_1_nama" label="Nama" placeholder="Masukkan nama" :error="errors.kontak_darurat_1_nama" />
            <InputText v-model="form.kontak_darurat_1_hubungan" label="Hubungan" placeholder="Contoh: Kakak" :error="errors.kontak_darurat_1_hubungan" />
            <InputTextarea v-model="form.kontak_darurat_1_alamat" label="Alamat" placeholder="Masukkan alamat" :rows="3" :error="errors.kontak_darurat_1_alamat" />
            <InputText v-model="form.kontak_darurat_1_telepon" label="Telepon" placeholder="0812xxxxxxx" :error="errors.kontak_darurat_1_telepon" />
          </div>
          <div class="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">Kontak Darurat 2</p>
            <InputText v-model="form.kontak_darurat_2_nama" label="Nama" placeholder="Masukkan nama" :error="errors.kontak_darurat_2_nama" />
            <InputText v-model="form.kontak_darurat_2_hubungan" label="Hubungan" placeholder="Contoh: Sahabat" :error="errors.kontak_darurat_2_hubungan" />
            <InputTextarea v-model="form.kontak_darurat_2_alamat" label="Alamat" placeholder="Masukkan alamat" :rows="3" :error="errors.kontak_darurat_2_alamat" />
            <InputText v-model="form.kontak_darurat_2_telepon" label="Telepon" placeholder="0812xxxxxxx" :error="errors.kontak_darurat_2_telepon" />
          </div>
        </div>
      </section>

      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header class="mb-6 flex flex-col gap-1">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">F. Berkas Pendukung</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Unggah dokumen pendukung untuk kelengkapan data.</p>
        </header>
        <div class="grid gap-6 md:grid-cols-2">
          <InputFile
            v-model="form.berkas_ktp"
            label="Upload KTP"
            placeholder="Belum diunggah"
            :error="errors.berkas_ktp"
            preview
            preview-kind="document"
          />
          <InputFile
            v-model="form.berkas_kk"
            label="Upload Kartu Keluarga"
            placeholder="Belum diunggah"
            :error="errors.berkas_kk"
            preview
            preview-kind="document"
          />
          <InputFile
            v-model="form.berkas_npwp"
            label="Upload NPWP"
            placeholder="Belum diunggah"
            :error="errors.berkas_npwp"
            preview
            preview-kind="document"
          />
          <InputFile
            v-model="form.berkas_bpjs_jkn"
            label="Upload BPJS JKN"
            placeholder="Belum diunggah"
            :error="errors.berkas_bpjs_jkn"
            preview
            preview-kind="document"
          />
          <InputFile
            v-model="form.berkas_bpjs_jht"
            label="Upload BPJS JHT"
            placeholder="Belum diunggah"
            :error="errors.berkas_bpjs_jht"
            preview
            preview-kind="document"
          />
        </div>
      </section>
    </form>

    <Toast :show="toast.show" :message="toast.message" :type="toast.type" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import InputDate from '../../components/InputDate.vue';
import InputFile from '../../components/InputFile.vue';
import InputSelect from '../../components/InputSelect.vue';
import InputText from '../../components/InputText.vue';
import InputTextarea from '../../components/InputTextarea.vue';
import Toast from '../../components/Toast.vue';
import http from '../../api/http';
import {
  GOLONGAN_DARAH_OPTIONS,
  JABATAN_OPTIONS,
  KONTRAK_OPTIONS,
  SEPATU_OPTIONS,
  STATUS_KEPEGAWAIAN_OPTIONS,
  STATUS_PERNIKAHAN_OPTIONS,
  UKURAN_BAJU_OPTIONS,
  UKURAN_CELANA_OPTIONS
} from '../../constants/pegawai';
import type { ApiError, JenisStatus, Pegawai, StatusKepegawaian, StatusPernikahan } from '../../types';

const route = useRoute();
const router = useRouter();

const mode = computed(() => (route.meta.mode as 'create' | 'edit') || (route.name === 'pegawai-edit' ? 'edit' : 'create'));

const title = computed(() => (mode.value === 'create' ? 'Tambah Pegawai' : 'Ubah Data Pegawai'));

const form = reactive({
  pas_foto: '' as string | null,
  nrp: '',
  nama_lengkap: '',
  jabatan: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  alamat_ktp: '',
  tinggi_badan: '',
  berat_badan: '',
  agama: '',
  status_pernikahan: 'Lajang' as StatusPernikahan,
  tanggal_pernikahan: '' as string | null,
  no_ktp: '',
  no_kk: '',
  no_npwp: '',
  no_bpjs_kesehatan: '',
  no_bpjs_ketenagakerjaan: '',
  alamat_domisili: '',
  tanggal_masuk: '',
  status_kepegawaian: 'Kontrak' as StatusKepegawaian,
  jenis_status: 'Kontrak 1' as JenisStatus,
  akhir_kontrak: '' as string | null,
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

const errors = reactive<Record<string, string | null>>({
  pas_foto: null,
  nrp: null,
  nama_lengkap: null,
  jabatan: null,
  tempat_lahir: null,
  tanggal_lahir: null,
  alamat_ktp: null,
  tinggi_badan: null,
  berat_badan: null,
  agama: null,
  status_pernikahan: null,
  tanggal_pernikahan: null,
  no_ktp: null,
  no_kk: null,
  no_npwp: null,
  no_bpjs_kesehatan: null,
  no_bpjs_ketenagakerjaan: null,
  alamat_domisili: null,
  tanggal_masuk: null,
  status_kepegawaian: null,
  jenis_status: null,
  akhir_kontrak: null,
  no_hp: null,
  telepon_2: null,
  email: null,
  password: null,
  pendidikan_terakhir: null,
  pekerjaan_terakhir: null,
  golongan_darah: null,
  no_rekening: null,
  nama_rekening: null,
  bank_rekening: null,
  tanggungan_keluarga: null,
  susunan_keluarga: null,
  anak_ke: null,
  jumlah_saudara: null,
  sepatu_safety: null,
  ukuran_baju: null,
  ukuran_celana: null,
  ahli_waris_nama: null,
  ahli_waris_tempat_lahir: null,
  ahli_waris_tanggal_lahir: null,
  ahli_waris_hubungan: null,
  ahli_waris_alamat: null,
  ahli_waris_telepon: null,
  kontak_darurat_1_nama: null,
  kontak_darurat_1_hubungan: null,
  kontak_darurat_1_alamat: null,
  kontak_darurat_1_telepon: null,
  kontak_darurat_2_nama: null,
  kontak_darurat_2_hubungan: null,
  kontak_darurat_2_alamat: null,
  kontak_darurat_2_telepon: null,
  berkas_ktp: null,
  berkas_kk: null,
  berkas_npwp: null,
  berkas_bpjs_jkn: null,
  berkas_bpjs_jht: null
});

const loadingSubmit = ref(false);
const toast = reactive({
  show: false,
  message: '',
  type: 'info' as 'success' | 'error' | 'info'
});

const statusOptions = [...STATUS_KEPEGAWAIAN_OPTIONS];
const kontrakOptions = [...KONTRAK_OPTIONS];
const jabatanOptions = [...JABATAN_OPTIONS];
const statusPernikahanOptions = [...STATUS_PERNIKAHAN_OPTIONS];
const golonganDarahOptions = [...GOLONGAN_DARAH_OPTIONS];
const sepatuOptions = [...SEPATU_OPTIONS];
const ukuranBajuOptions = [...UKURAN_BAJU_OPTIONS];
const ukuranCelanaOptions = [...UKURAN_CELANA_OPTIONS];

watch(
  () => form.status_kepegawaian,
  (value) => {
    if (value === 'Permanen') {
      form.jenis_status = 'Permanen';
      form.akhir_kontrak = null;
      errors.akhir_kontrak = null;
      errors.jenis_status = null;
    } else if (!form.jenis_status || form.jenis_status === 'Permanen') {
      form.jenis_status = 'Kontrak 1';
    }
  },
  { immediate: true }
);

watch(
  () => form.status_pernikahan,
  (value) => {
    if (value !== 'Menikah') {
      form.tanggal_pernikahan = null;
    }
  },
  { immediate: true }
);

const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  toast.message = message;
  toast.type = type;
  toast.show = true;
};

const kembali = () => {
  router.push({ name: 'pegawai-list' });
};

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = null;
  });
};

const validate = () => {
  clearErrors();
  if (!form.nrp) errors.nrp = 'NRP wajib diisi.';
  if (!form.tanggal_masuk) errors.tanggal_masuk = 'Tanggal masuk wajib diisi.';
  if (!form.status_kepegawaian) errors.status_kepegawaian = 'Status kepegawaian wajib dipilih.';
  if (!form.email) {
    errors.email = 'Email wajib diisi.';
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Format email tidak valid.';
  }
  if (!form.password) {
    errors.password = 'Kata sandi wajib diisi.';
  } else if (form.password.length < 4) {
    errors.password = 'Minimal 4 karakter.';
  }
  if (form.status_kepegawaian === 'Kontrak' && !form.jenis_status) {
    errors.jenis_status = 'Pilih jenis kontrak.';
  }
  if (form.status_kepegawaian === 'Kontrak' && !form.akhir_kontrak) {
    errors.akhir_kontrak = 'Tanggal akhir kontrak wajib diisi untuk pegawai kontrak.';
  }
  return Object.values(errors).every((value) => !value);
};

const loadData = async () => {
  if (mode.value !== 'edit') return;
  const id = Number(route.params.id);
  if (!id) return;
  try {
    const { data } = await http.get<Pegawai>(`/api/pegawai/${id}`);
    form.pas_foto = data.pas_foto ?? '';
    form.nrp = data.nrp;
    form.nama_lengkap = data.nama_lengkap;
    form.jabatan = data.jabatan;
    form.tempat_lahir = data.tempat_lahir;
    form.tanggal_lahir = data.tanggal_lahir;
    form.alamat_ktp = data.alamat_ktp;
    form.tinggi_badan = data.tinggi_badan ?? '';
    form.berat_badan = data.berat_badan ?? '';
    form.agama = data.agama ?? '';
    form.status_pernikahan = data.status_pernikahan ?? 'Lajang';
    form.tanggal_pernikahan = data.tanggal_pernikahan ?? null;
    form.no_ktp = data.no_ktp ?? '';
    form.no_kk = data.no_kk ?? '';
    form.no_npwp = data.no_npwp ?? '';
    form.no_bpjs_kesehatan = data.no_bpjs_kesehatan ?? '';
    form.no_bpjs_ketenagakerjaan = data.no_bpjs_ketenagakerjaan ?? '';
    form.alamat_domisili = data.alamat_domisili ?? '';
    form.tanggal_masuk = data.tanggal_masuk;
    form.status_kepegawaian = data.status_kepegawaian;
    form.jenis_status = data.jenis_status;
    form.akhir_kontrak = data.akhir_kontrak ?? null;
    form.no_hp = data.no_hp;
    form.telepon_2 = data.telepon_2 ?? '';
    form.email = data.email ?? '';
    form.password = data.password ?? '';
    form.pendidikan_terakhir = data.pendidikan_terakhir ?? '';
    form.pekerjaan_terakhir = data.pekerjaan_terakhir ?? '';
    form.golongan_darah = data.golongan_darah ?? '';
    form.no_rekening = data.no_rekening ?? '';
    form.nama_rekening = data.nama_rekening ?? '';
    form.bank_rekening = data.bank_rekening ?? '';
    form.tanggungan_keluarga = data.tanggungan_keluarga ?? '';
    form.susunan_keluarga = data.susunan_keluarga ?? '';
    form.anak_ke = data.anak_ke ?? '';
    form.jumlah_saudara = data.jumlah_saudara ?? '';
    form.sepatu_safety = data.sepatu_safety ?? '';
    form.ukuran_baju = data.ukuran_baju ?? '';
    form.ukuran_celana = data.ukuran_celana ?? '';
    form.ahli_waris_nama = data.ahli_waris_nama ?? '';
    form.ahli_waris_tempat_lahir = data.ahli_waris_tempat_lahir ?? '';
    form.ahli_waris_tanggal_lahir = data.ahli_waris_tanggal_lahir ?? '';
    form.ahli_waris_hubungan = data.ahli_waris_hubungan ?? '';
    form.ahli_waris_alamat = data.ahli_waris_alamat ?? '';
    form.ahli_waris_telepon = data.ahli_waris_telepon ?? '';
    form.kontak_darurat_1_nama = data.kontak_darurat_1_nama ?? '';
    form.kontak_darurat_1_hubungan = data.kontak_darurat_1_hubungan ?? '';
    form.kontak_darurat_1_alamat = data.kontak_darurat_1_alamat ?? '';
    form.kontak_darurat_1_telepon = data.kontak_darurat_1_telepon ?? '';
    form.kontak_darurat_2_nama = data.kontak_darurat_2_nama ?? '';
    form.kontak_darurat_2_hubungan = data.kontak_darurat_2_hubungan ?? '';
    form.kontak_darurat_2_alamat = data.kontak_darurat_2_alamat ?? '';
    form.kontak_darurat_2_telepon = data.kontak_darurat_2_telepon ?? '';
    form.berkas_ktp = data.berkas_ktp ?? '';
    form.berkas_kk = data.berkas_kk ?? '';
    form.berkas_npwp = data.berkas_npwp ?? '';
    form.berkas_bpjs_jkn = data.berkas_bpjs_jkn ?? '';
    form.berkas_bpjs_jht = data.berkas_bpjs_jht ?? '';
  } catch (error) {
    console.error('Gagal memuat data pegawai', error);
    showToast('Data pegawai tidak ditemukan.', 'error');
    router.replace({ name: 'pegawai-list' });
  }
};

const submitForm = async () => {
  if (!validate()) {
    showToast('Silakan perbaiki input yang belum valid.', 'error');
    return;
  }
  loadingSubmit.value = true;
  clearErrors();
  try {
    const payload = {
      ...form,
      pas_foto: form.pas_foto || '',
      tanggal_pernikahan: form.status_pernikahan === 'Menikah' ? form.tanggal_pernikahan : null,
      jenis_status: form.status_kepegawaian === 'Permanen' ? 'Permanen' : form.jenis_status,
      akhir_kontrak: form.status_kepegawaian === 'Permanen' ? null : form.akhir_kontrak
    };
    if (mode.value === 'create') {
      await http.post('/api/pegawai', payload);
      showToast('Pegawai berhasil ditambahkan.', 'success');
    } else {
      const id = Number(route.params.id);
      await http.put(`/api/pegawai/${id}`, payload);
      showToast('Perubahan data pegawai berhasil disimpan.', 'success');
    }
    router.push({ name: 'pegawai-list' });
  } catch (error: any) {
    const apiError = error.response?.data as ApiError | undefined;
    if (apiError?.errors) {
      Object.entries(apiError.errors).forEach(([key, messages]) => {
        errors[key] = messages[0];
      });
    }
    showToast(apiError?.message || 'Terjadi kesalahan saat menyimpan data.', 'error');
  } finally {
    loadingSubmit.value = false;
  }
};

watch(
  () => form.status_kepegawaian,
  (value) => {
    if (value === 'Permanen') {
      form.akhir_kontrak = null;
      errors.akhir_kontrak = null;
    }
  }
);

onMounted(() => {
  loadData();
});
</script>
