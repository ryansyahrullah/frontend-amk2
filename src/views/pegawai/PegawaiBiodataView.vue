<template>
  <div class="mx-auto max-w-5xl space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-semibold text-slate-900 dark:text-slate-100">Biodata Pegawai</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Lengkapi informasi pribadi dan keluarga Anda. Beberapa kolom seperti NRP serta detail kontrak dikunci oleh tim HR.
      </p>
    </header>

    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div v-if="loading" class="space-y-4">
        <div v-for="index in 10" :key="`form-skeleton-${index}`" class="h-12 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/60"></div>
      </div>
      <form v-else class="space-y-8" @submit.prevent="onSubmit">
        <section class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <header class="mb-4 space-y-1">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Kategori Akun</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Kelola kredensial AMK PORTAL dan pantau status kepegawaian Anda.</p>
          </header>
          <div class="grid gap-6 md:grid-cols-2">
            <InputText v-model="form.nrp" label="NRP" :disabled="true" hint="Ditentukan oleh HR" />
            <InputText v-model="form.email" label="Alamat Email" placeholder="contoh@perusahaan.com" :error="errors.email" />
            <InputText v-model="form.password" label="Kata Sandi AMK PORTAL" placeholder="Minimal 4 karakter" :error="errors.password" />
            <InputDate v-model="form.tanggal_masuk" label="Tanggal Masuk" :disabled="true" />
            <InputSelect
              v-model="form.status_kepegawaian"
              label="Status Kepegawaian"
              :options="statusOptions"
              :disabled="true"
            />
            <InputSelect
              v-model="form.jenis_status"
              label="Jenis Kontrak"
              :options="kontrakOptions"
              :disabled="form.status_kepegawaian !== 'Kontrak'"
            />
            <InputDate
              v-model="form.akhir_kontrak"
              label="Akhir Kontrak"
              :disabled="form.status_kepegawaian === 'Permanen'"
              hint="Otomatis kosong bila status permanen"
            />
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <header class="mb-4 space-y-1">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">A. Identitas Pegawai</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Data pribadi dan kontak utama Anda.</p>
          </header>
          <div class="grid gap-6 md:grid-cols-2">
            <InputFile
              v-model="form.pas_foto"
              label="Pas Foto 3x4"
              placeholder="Belum diunggah"
              preview
              preview-kind="image"
              accept="image/*"
            />
            <InputSelect
              v-model="form.jabatan"
              label="Jabatan"
              placeholder="Pilih jabatan"
              :options="jabatanOptions"
              searchable
            />
            <InputText v-model="form.nama_lengkap" label="Nama Lengkap" placeholder="Masukkan nama lengkap" :error="errors.nama_lengkap" />
            <InputText v-model="form.tempat_lahir" label="Tempat Lahir" placeholder="Masukkan tempat lahir" :error="errors.tempat_lahir" />
            <InputDate v-model="form.tanggal_lahir" label="Tanggal Lahir" :error="errors.tanggal_lahir" />
            <InputText v-model="form.tinggi_badan" label="Tinggi Badan (cm)" placeholder="Contoh: 170" />
            <InputText v-model="form.berat_badan" label="Berat Badan (kg)" placeholder="Contoh: 65" />
            <InputText v-model="form.agama" label="Agama/Kepercayaan" placeholder="Contoh: Islam" :error="errors.agama" />
            <InputSelect
              v-model="form.status_pernikahan"
              label="Status Pernikahan"
              :options="statusPernikahanOptions"
            />
            <InputDate
              v-model="form.tanggal_pernikahan"
              label="Tanggal Pernikahan"
              :disabled="form.status_pernikahan !== 'Menikah'"
              hint="Isi bila berstatus menikah"
            />
            <InputText v-model="form.no_ktp" label="No KTP" placeholder="Masukkan nomor KTP" />
            <InputText v-model="form.no_kk" label="No Kartu Keluarga" placeholder="Masukkan nomor KK" />
            <InputText v-model="form.no_npwp" label="Nomor NPWP" placeholder="Masukkan nomor NPWP" />
            <InputText v-model="form.no_bpjs_kesehatan" label="No BPJS Kesehatan" placeholder="Masukkan nomor BPJS" />
            <InputText v-model="form.no_bpjs_ketenagakerjaan" label="No BPJS Ketenagakerjaan" placeholder="Masukkan nomor BPJS" />
            <InputTextarea v-model="form.alamat_ktp" label="Alamat Sesuai KTP" :rows="3" placeholder="Masukkan alamat sesuai KTP" :error="errors.alamat_ktp" class="md:col-span-2" />
            <InputTextarea v-model="form.alamat_domisili" label="Alamat Domisili" :rows="3" placeholder="Masukkan alamat domisili" />
            <InputText v-model="form.no_hp" label="Telepon 1" placeholder="0812xxxxxxx" :error="errors.no_hp" />
            <InputText v-model="form.telepon_2" label="Telepon 2" placeholder="Opsional" />
            <InputText v-model="form.pendidikan_terakhir" label="Pendidikan Terakhir" placeholder="Contoh: S1 Manajemen" />
            <InputText v-model="form.pekerjaan_terakhir" label="Pekerjaan Terakhir" placeholder="Masukkan riwayat pekerjaan" />
            <InputSelect v-model="form.golongan_darah" label="Golongan Darah" :options="golonganDarahOptions" />
            <InputText v-model="form.no_rekening" label="No Rekening" placeholder="Masukkan nomor rekening" />
            <InputText v-model="form.nama_rekening" label="Nama Rekening" placeholder="Masukkan nama pemilik rekening" />
            <InputText v-model="form.bank_rekening" label="Bank Rekening" placeholder="Contoh: BCA" />
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <header class="mb-4 space-y-1">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">B. Susunan Keluarga</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Informasi tanggungan dan struktur keluarga Anda.</p>
          </header>
          <div class="grid gap-6 md:grid-cols-2">
            <InputText v-model="form.tanggungan_keluarga" label="Tanggungan Keluarga (orang)" placeholder="Contoh: 3" />
            <InputText v-model="form.anak_ke" label="Anak Nomor Ke" placeholder="Contoh: 2" />
            <InputText v-model="form.jumlah_saudara" label="Berapa Bersaudara" placeholder="Contoh: 4" />
            <InputTextarea v-model="form.susunan_keluarga" label="Jelaskan terdiri dari siapa saja" :rows="3" class="md:col-span-2" />
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <header class="mb-4 space-y-1">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">C. Ukuran Perlengkapan Kerja</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Pastikan ukuran sesuai kebutuhan perlengkapan Anda.</p>
          </header>
          <div class="grid gap-6 md:grid-cols-3">
            <InputSelect v-model="form.sepatu_safety" label="Sepatu Safety" :options="sepatuOptions" placeholder="Pilih ukuran" />
            <InputSelect v-model="form.ukuran_baju" label="Ukuran Baju" :options="ukuranBajuOptions" placeholder="Pilih ukuran" />
            <InputSelect v-model="form.ukuran_celana" label="Ukuran Celana" :options="ukuranCelanaOptions" placeholder="Pilih ukuran" />
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <header class="mb-4 space-y-1">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">D. Ahli Waris</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Data ahli waris untuk kebutuhan administrasi dan klaim.</p>
          </header>
          <div class="grid gap-6 md:grid-cols-2">
            <InputText v-model="form.ahli_waris_nama" label="Nama" placeholder="Masukkan nama ahli waris" />
            <InputText v-model="form.ahli_waris_hubungan" label="Hubungan Keluarga" placeholder="Contoh: Istri" />
            <InputText v-model="form.ahli_waris_tempat_lahir" label="Tempat Lahir" placeholder="Contoh: Jakarta" />
            <InputDate v-model="form.ahli_waris_tanggal_lahir" label="Tanggal Lahir" />
            <InputTextarea v-model="form.ahli_waris_alamat" label="Alamat" :rows="3" class="md:col-span-2" />
            <InputText v-model="form.ahli_waris_telepon" label="Telepon" placeholder="0812xxxxxxx" />
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <header class="mb-4 space-y-1">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">E. Kontak Darurat</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Masukkan dua saudara/kerabat yang dapat dihubungi.</p>
          </header>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">Kontak Darurat 1</p>
              <InputText v-model="form.kontak_darurat_1_nama" label="Nama" placeholder="Masukkan nama" />
              <InputText v-model="form.kontak_darurat_1_hubungan" label="Hubungan" placeholder="Contoh: Kakak" />
              <InputTextarea v-model="form.kontak_darurat_1_alamat" label="Alamat" :rows="3" />
              <InputText v-model="form.kontak_darurat_1_telepon" label="Telepon" placeholder="0812xxxxxxx" />
            </div>
            <div class="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">Kontak Darurat 2</p>
              <InputText v-model="form.kontak_darurat_2_nama" label="Nama" placeholder="Masukkan nama" />
              <InputText v-model="form.kontak_darurat_2_hubungan" label="Hubungan" placeholder="Contoh: Sahabat" />
              <InputTextarea v-model="form.kontak_darurat_2_alamat" label="Alamat" :rows="3" />
              <InputText v-model="form.kontak_darurat_2_telepon" label="Telepon" placeholder="0812xxxxxxx" />
            </div>
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <header class="mb-4 space-y-1">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">F. Berkas Pendukung</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Unggah dokumen pendukung untuk kelengkapan data.</p>
          </header>
          <div class="grid gap-6 md:grid-cols-2">
            <InputFile v-model="form.berkas_ktp" label="Upload KTP" placeholder="Belum diunggah" preview preview-kind="document" />
            <InputFile v-model="form.berkas_kk" label="Upload Kartu Keluarga" placeholder="Belum diunggah" preview preview-kind="document" />
            <InputFile v-model="form.berkas_npwp" label="Upload NPWP" placeholder="Belum diunggah" preview preview-kind="document" />
            <InputFile v-model="form.berkas_bpjs_jkn" label="Upload BPJS JKN" placeholder="Belum diunggah" preview preview-kind="document" />
            <InputFile v-model="form.berkas_bpjs_jht" label="Upload BPJS JHT" placeholder="Belum diunggah" preview preview-kind="document" />
          </div>
        </section>

        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <RouterLink
            :to="{ name: 'pegawai-dashboard' }"
            class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-primary dark:text-slate-400 dark:hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Kembali ke dashboard
          </RouterLink>
          <div class="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="secondary" class="justify-center sm:px-6" :disabled="saving" @click="resetForm">
              Atur Ulang
            </Button>
            <Button type="submit" class="justify-center sm:px-6" :loading="saving">
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </form>
    </div>

    <Toast :show="toast.show" :type="toast.type" :message="toast.message" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
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

const loading = ref(true);
const saving = ref(false);
const initialData = ref<Pegawai | null>(null);

const form = reactive({
  pas_foto: '' as string | null,
  nrp: '',
  email: '',
  password: '',
  tanggal_masuk: '',
  status_kepegawaian: '' as StatusKepegawaian | '',
  jenis_status: 'Kontrak 1' as JenisStatus,
  akhir_kontrak: '' as string | null,
  nama_lengkap: '',
  jabatan: '',
  tempat_lahir: '',
  tanggal_lahir: '',
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
  alamat_ktp: '',
  alamat_domisili: '',
  no_hp: '',
  telepon_2: '',
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
  email: null,
  password: null,
  nama_lengkap: null,
  tempat_lahir: null,
  tanggal_lahir: null,
  agama: null,
  alamat_ktp: null,
  no_hp: null
});

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
    } else if (!form.jenis_status || form.jenis_status === 'Permanen') {
      form.jenis_status = 'Kontrak 1';
    }
  }
);

watch(
  () => form.status_pernikahan,
  (value) => {
    if (value !== 'Menikah') {
      form.tanggal_pernikahan = null;
    }
  }
);

const fetchData = async () => {
  loading.value = true;
  try {
    const { data } = await http.get<Pegawai>('/api/pegawai/me');
    initialData.value = data;
    assignForm(data);
  } catch (error) {
    showToast('Gagal memuat biodata pegawai.', 'error');
  } finally {
    loading.value = false;
  }
};

const assignForm = (data: Pegawai) => {
  form.pas_foto = data.pas_foto ?? '';
  form.nrp = data.nrp;
  form.email = data.email ?? '';
  form.password = data.password ?? '';
  form.tanggal_masuk = data.tanggal_masuk;
  form.status_kepegawaian = data.status_kepegawaian;
  form.jenis_status = data.jenis_status;
  form.akhir_kontrak = data.akhir_kontrak ?? null;
  form.nama_lengkap = data.nama_lengkap;
  form.jabatan = data.jabatan;
  form.tempat_lahir = data.tempat_lahir;
  form.tanggal_lahir = data.tanggal_lahir;
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
  form.alamat_ktp = data.alamat_ktp ?? '';
  form.alamat_domisili = data.alamat_domisili ?? '';
  form.no_hp = data.no_hp ?? '';
  form.telepon_2 = data.telepon_2 ?? '';
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
};

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = null;
  });
};

const validate = () => {
  clearErrors();
  if (!form.email) {
    errors.email = 'Email wajib diisi.';
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Format email tidak valid.';
  }
  if (!form.password || form.password.length < 4) {
    errors.password = 'Kata sandi minimal 4 karakter.';
  }
  if (!form.nama_lengkap) errors.nama_lengkap = 'Nama wajib diisi.';
  if (!form.tempat_lahir) errors.tempat_lahir = 'Tempat lahir wajib diisi.';
  if (!form.tanggal_lahir) errors.tanggal_lahir = 'Tanggal lahir wajib diisi.';
  if (!form.agama) errors.agama = 'Agama wajib diisi.';
  if (!form.alamat_ktp) errors.alamat_ktp = 'Alamat KTP wajib diisi.';
  if (!form.no_hp) errors.no_hp = 'Telepon utama wajib diisi.';
  return Object.values(errors).every((value) => !value);
};

const onSubmit = async () => {
  if (!validate()) {
    showToast('Periksa kembali input yang belum valid.', 'error');
    return;
  }

  saving.value = true;
  try {
    const payload = {
      ...form,
      tanggal_pernikahan: form.status_pernikahan === 'Menikah' ? form.tanggal_pernikahan : null,
      jenis_status: form.status_kepegawaian === 'Permanen' ? 'Permanen' : form.jenis_status,
      akhir_kontrak: form.status_kepegawaian === 'Permanen' ? null : form.akhir_kontrak
    };
    await http.put('/api/pegawai/me', payload);
    showToast('Biodata berhasil diperbarui.', 'success');
    if (initialData.value) {
      initialData.value = { ...initialData.value, ...payload } as Pegawai;
      assignForm(initialData.value);
    }
  } catch (error: any) {
    const apiError = error.response?.data as ApiError | undefined;
    if (apiError?.errors) {
      Object.entries(apiError.errors).forEach(([key, messages]) => {
        errors[key] = messages[0];
      });
    }
    showToast(apiError?.message || 'Terjadi kesalahan saat menyimpan biodata.', 'error');
  } finally {
    saving.value = false;
  }
};

const resetForm = () => {
  if (initialData.value) {
    assignForm(initialData.value);
  }
  showToast('Data dikembalikan seperti semula.', 'info');
};

const showToast = (message: string, type: 'success' | 'error' | 'info') => {
  toast.message = message;
  toast.type = type;
  toast.show = true;
};

fetchData();
</script>
