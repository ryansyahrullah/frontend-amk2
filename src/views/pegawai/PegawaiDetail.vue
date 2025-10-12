<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">Detail Pegawai</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Informasi lengkap pegawai untuk keperluan administrasi.</p>
      </div>
      <div class="flex gap-2">
        <Button variant="ghost" @click="kembali">Kembali</Button>
        <Button v-if="pegawai" @click="goToEdit">Ubah</Button>
        <Button v-if="pegawai" variant="danger" @click="showConfirm = true">Hapus</Button>
      </div>
    </div>

    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div v-if="loading" class="grid gap-6 md:grid-cols-2">
        <div v-for="n in 12" :key="n" class="h-5 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
      </div>
      <div v-else-if="pegawai" class="space-y-10">
        <section class="space-y-4">
          <div>
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Pratinjau Foto &amp; Dokumen</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Klik tombol lihat untuk memperbesar tampilan berkas.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <FilePreview :file-name="pegawai.pas_foto" label="Pas Foto 3x4" preset-kind="image" />
            <FilePreview :file-name="pegawai.berkas_ktp" label="KTP" preset-kind="document" />
            <FilePreview :file-name="pegawai.berkas_kk" label="Kartu Keluarga" preset-kind="document" />
            <FilePreview :file-name="pegawai.berkas_npwp" label="NPWP" preset-kind="document" />
            <FilePreview :file-name="pegawai.berkas_bpjs_jkn" label="BPJS JKN" preset-kind="document" />
            <FilePreview :file-name="pegawai.berkas_bpjs_jht" label="BPJS JHT" preset-kind="document" />
          </div>
        </section>

        <section v-for="section in detailSections" :key="section.title" class="space-y-4">
          <div>
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ section.title }}</h2>
            <p v-if="section.description" class="text-sm text-slate-500 dark:text-slate-400">{{ section.description }}</p>
          </div>
          <div :class="['grid gap-6', gridClass(section.columns)]">
            <div
              v-for="field in section.fields"
              :key="field.label"
              :class="['space-y-1', field.fullWidth ? fullWidthClass(section.columns) : '']"
            >
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ field.label }}</p>
              <p class="whitespace-pre-line text-sm text-slate-800 dark:text-slate-100">{{ field.value }}</p>
            </div>
          </div>
        </section>
      </div>
      <div v-else class="flex flex-col items-center gap-2 py-12 text-slate-500 dark:text-slate-400">
        <span class="text-3xl">🕵️‍♀️</span>
        Data pegawai tidak ditemukan.
      </div>
    </div>

    <ConfirmDialog
      v-model="showConfirm"
      title="Hapus Pegawai"
      :message="`Apakah Anda yakin ingin menghapus pegawai ${pegawai?.nama_lengkap}?`"
      :loading="loadingDelete"
      @confirm="deletePegawai"
    />

    <Toast :show="toast.show" :message="toast.message" :type="toast.type" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import ConfirmDialog from '../../components/ConfirmDialog.vue';
import FilePreview from '../../components/FilePreview.vue';
import Toast from '../../components/Toast.vue';
import http from '../../api/http';
import type { Pegawai } from '../../types';

const route = useRoute();
const router = useRouter();

const pegawai = ref<Pegawai | null>(null);
const loading = ref(true);
const showConfirm = ref(false);
const loadingDelete = ref(false);
const toast = reactive({
  show: false,
  message: '',
  type: 'info' as 'success' | 'error' | 'info'
});

const gridClass = (columns?: number) => {
  switch (columns) {
    case 1:
      return 'md:grid-cols-1';
    case 3:
      return 'md:grid-cols-3';
    default:
      return 'md:grid-cols-2';
  }
};

const fullWidthClass = (columns?: number) => {
  switch (columns) {
    case 3:
      return 'md:col-span-3';
    case 1:
      return 'md:col-span-1';
    default:
      return 'md:col-span-2';
  }
};

const detailSections = computed(() => {
  const data = pegawai.value;
  if (!data) {
    return [] as Array<{
      title: string;
      description?: string;
      columns?: number;
      fields: Array<{ label: string; value: string; fullWidth?: boolean }>;
    }>;
  }

  const formatNullableDate = (value: string | null | undefined) => (value ? formatDate(value) : '-');
  const formatNullableDateTime = (value: string | null | undefined) => (value ? formatDateTime(value) : '-');
  const formatText = (value: string | null | undefined) => (value && value.trim() ? value : '-');
  const formatContact = (params: {
    nama: string | null | undefined;
    hubungan: string | null | undefined;
    alamat: string | null | undefined;
    telepon: string | null | undefined;
  }) => {
    const lines = [
      `Nama: ${formatText(params.nama)}`,
      `Hubungan: ${formatText(params.hubungan)}`,
      `Alamat: ${formatText(params.alamat)}`,
      `Telepon: ${formatText(params.telepon)}`
    ];
    return lines.join('\n');
  };

  return [
    {
      title: 'Kategori Akun',
      description: 'Informasi akses AMK PORTAL dan status kepegawaian.',
      columns: 2,
      fields: [
        { label: 'NRP', value: data.nrp },
        { label: 'Alamat Email', value: formatText(data.email) },
        { label: 'Kata Sandi AMK PORTAL', value: formatText(data.password) },
        { label: 'Tanggal Masuk', value: formatDate(data.tanggal_masuk) },
        { label: 'Status Kepegawaian', value: data.status_kepegawaian },
        {
          label: 'Status Kontrak',
          value: data.status_kepegawaian === 'Kontrak' ? data.jenis_status : 'Permanen'
        },
        { label: 'Akhir Kontrak', value: formatNullableDate(data.akhir_kontrak) }
      ]
    },
    {
      title: 'A. Identitas Pegawai',
      description: 'Data resmi pegawai yang digunakan untuk administrasi perusahaan.',
      columns: 2,
      fields: [
        { label: 'Nama Lengkap', value: data.nama_lengkap },
        { label: 'Jabatan', value: data.jabatan },
        { label: 'Tempat Lahir', value: data.tempat_lahir },
        { label: 'Tanggal Lahir', value: formatDate(data.tanggal_lahir) },
        { label: 'Alamat Sesuai KTP', value: formatText(data.alamat_ktp), fullWidth: true },
        { label: 'Alamat Domisili', value: formatText(data.alamat_domisili), fullWidth: true },
        { label: 'Tinggi Badan (cm)', value: formatText(data.tinggi_badan) },
        { label: 'Berat Badan (kg)', value: formatText(data.berat_badan) },
        { label: 'Agama/Kepercayaan', value: formatText(data.agama) },
        { label: 'Status Pernikahan', value: data.status_pernikahan },
        { label: 'Tanggal Pernikahan', value: formatNullableDate(data.tanggal_pernikahan) },
        { label: 'No KTP', value: formatText(data.no_ktp) },
        { label: 'No Kartu Keluarga', value: formatText(data.no_kk) },
        { label: 'Nomor NPWP', value: formatText(data.no_npwp) },
        { label: 'No BPJS Kesehatan', value: formatText(data.no_bpjs_kesehatan) },
        { label: 'No BPJS Ketenagakerjaan', value: formatText(data.no_bpjs_ketenagakerjaan) },
        { label: 'Telepon 1', value: formatText(data.no_hp) },
        { label: 'Telepon 2', value: formatText(data.telepon_2) },
        { label: 'Pendidikan Terakhir', value: formatText(data.pendidikan_terakhir) },
        { label: 'Pekerjaan Terakhir', value: formatText(data.pekerjaan_terakhir) },
        { label: 'Golongan Darah', value: formatText(data.golongan_darah) },
        { label: 'No Rekening', value: formatText(data.no_rekening) },
        { label: 'Nama Rekening', value: formatText(data.nama_rekening) },
        { label: 'Bank Rekening', value: formatText(data.bank_rekening) }
      ]
    },
    {
      title: 'B. Susunan Keluarga',
      description: 'Ringkasan tanggungan keluarga dan struktur keluarga inti.',
      columns: 2,
      fields: [
        { label: 'Tanggungan Keluarga', value: formatText(data.tanggungan_keluarga) },
        { label: 'Anak Nomor Ke', value: formatText(data.anak_ke) },
        { label: 'Berapa Bersaudara', value: formatText(data.jumlah_saudara) },
        { label: 'Jelaskan Terdiri dari Siapa Saja', value: formatText(data.susunan_keluarga), fullWidth: true }
      ]
    },
    {
      title: 'C. Ukuran Sepatu dan Baju Kerja',
      description: 'Ukuran perlengkapan kerja untuk memastikan ketersediaan stok yang sesuai.',
      columns: 3,
      fields: [
        { label: 'Sepatu Safety', value: formatText(data.sepatu_safety) },
        { label: 'Ukuran Baju', value: formatText(data.ukuran_baju) },
        { label: 'Ukuran Celana', value: formatText(data.ukuran_celana) }
      ]
    },
    {
      title: 'D. Ahli Waris',
      description: 'Data ahli waris untuk keperluan administrasi dan klaim.',
      columns: 2,
      fields: [
        { label: 'Nama Ahli Waris', value: formatText(data.ahli_waris_nama) },
        { label: 'Hubungan Keluarga', value: formatText(data.ahli_waris_hubungan) },
        { label: 'Tempat Lahir', value: formatText(data.ahli_waris_tempat_lahir) },
        { label: 'Tanggal Lahir', value: formatNullableDate(data.ahli_waris_tanggal_lahir) },
        { label: 'Alamat', value: formatText(data.ahli_waris_alamat), fullWidth: true },
        { label: 'Telepon', value: formatText(data.ahli_waris_telepon) }
      ]
    },
    {
      title: 'E. Kontak Darurat',
      description: 'Daftar kontak saudara atau kenalan yang dapat dihubungi dalam keadaan darurat.',
      columns: 1,
      fields: [
        {
          label: 'Kontak Darurat 1',
          value: formatContact({
            nama: data.kontak_darurat_1_nama,
            hubungan: data.kontak_darurat_1_hubungan,
            alamat: data.kontak_darurat_1_alamat,
            telepon: data.kontak_darurat_1_telepon
          }),
          fullWidth: true
        },
        {
          label: 'Kontak Darurat 2',
          value: formatContact({
            nama: data.kontak_darurat_2_nama,
            hubungan: data.kontak_darurat_2_hubungan,
            alamat: data.kontak_darurat_2_alamat,
            telepon: data.kontak_darurat_2_telepon
          }),
          fullWidth: true
        }
      ]
    },
    {
      title: 'F. Informasi Sistem',
      description: 'Riwayat pencatatan di AMK PORTAL.',
      columns: 2,
      fields: [
        { label: 'Dibuat Pada', value: formatNullableDateTime(data.created_at) },
        { label: 'Diperbarui Pada', value: formatNullableDateTime(data.updated_at) }
      ]
    }
  ];
});

const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  toast.message = message;
  toast.type = type;
  toast.show = true;
};

const kembali = () => router.push({ name: 'pegawai-list' });

const goToEdit = () => {
  if (!pegawai.value) return;
  router.push({ name: 'pegawai-edit', params: { id: pegawai.value.id } });
};

const fetchPegawai = async () => {
  const id = Number(route.params.id);
  if (!id) {
    loading.value = false;
    return;
  }
  loading.value = true;
  try {
    const { data } = await http.get<Pegawai>(`/api/pegawai/${id}`);
    pegawai.value = data;
  } catch (error) {
    console.error('Gagal memuat detail pegawai', error);
    showToast('Data pegawai tidak ditemukan.', 'error');
  } finally {
    loading.value = false;
  }
};

const deletePegawai = async () => {
  if (!pegawai.value) return;
  loadingDelete.value = true;
  try {
    await http.delete(`/api/pegawai/${pegawai.value.id}`);
    showToast('Pegawai berhasil dihapus.', 'success');
    showConfirm.value = false;
    router.push({ name: 'pegawai-list' });
  } catch (error) {
    console.error('Gagal menghapus pegawai', error);
    showToast('Terjadi kesalahan saat menghapus pegawai.', 'error');
  } finally {
    loadingDelete.value = false;
  }
};

onMounted(() => {
  fetchPegawai();
});

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(value: string) {
  const date = new Date(value);
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>
