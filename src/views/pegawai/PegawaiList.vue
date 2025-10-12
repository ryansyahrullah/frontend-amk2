<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">Data Pegawai</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Kelola biodata pegawai, tambah, ubah, dan hapus dengan mudah.</p>
      </div>
      <Button @click="goToCreate">
        Tambah Pegawai
      </Button>
    </div>

    <SearchBar v-model:search="filters.search" v-model:perPage="filters.per_page" />

    <div
      class="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2"
    >
      <div>
        <label class="text-sm font-semibold text-slate-600 dark:text-slate-300">Urutkan berdasarkan</label>
        <select
          v-model="filters.sort"
          class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div>
        <label class="text-sm font-semibold text-slate-600 dark:text-slate-300">Filter status pegawai</label>
        <select
          v-model="filters.status"
          class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          <option v-for="option in statusFilterOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <AppTable
        :columns="columns"
        :items="pegawai"
        :loading="loading"
        row-key="id"
        empty-message="Belum ada data pegawai."
      >
        <template #cell-nrp="{ item }">
          <span class="font-mono text-sm text-slate-700 dark:text-slate-200">{{ item.nrp }}</span>
        </template>
        <template #cell-email="{ item }">
          <span class="font-mono text-xs text-slate-600 dark:text-slate-300">{{ item.email ?? '-' }}</span>
        </template>
        <template #cell-password="{ item }">
          <span class="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {{ item.password ?? '-' }}
          </span>
        </template>
        <template #cell-tanggal_masuk="{ item }">
          {{ formatDate(item.tanggal_masuk) }}
        </template>
        <template #cell-akhir_kontrak="{ item }">
          {{ item.akhir_kontrak ? formatDate(item.akhir_kontrak) : '-' }}
        </template>
        <template #cell-jenis_status="{ item }">
          <span
            class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            :class="item.jenis_status !== 'Permanen' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'"
          >
            {{ item.jenis_status }}
          </span>
        </template>
        <template #cell-aksi="{ item }">
          <div class="flex gap-2">
            <Button size="sm" variant="secondary" @click="goToDetail(item.id)">Lihat</Button>
            <Button size="sm" @click="goToEdit(item.id)">Ubah</Button>
            <Button size="sm" variant="danger" @click="confirmDelete(item)">Hapus</Button>
          </div>
        </template>
      </AppTable>
      <AppPagination
        v-if="meta.total > 0"
        :current-page="meta.current_page"
        :total-pages="totalPages"
        :total-items="meta.total"
        @change="changePage"
      />
    </div>

    <ConfirmDialog
      v-model="showConfirm"
      title="Hapus Pegawai"
      :message="`Apakah Anda yakin ingin menghapus pegawai ${selectedPegawai?.nama_lengkap}? Tindakan ini tidak dapat dibatalkan. Untuk melanjutkan, ketik kode konfirmasi di bawah.`"
      :loading="loadingDelete"
      :confirmation-code="deleteConfirmationCode"
      @confirm="executeDelete"
    />

    <Toast
      :show="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import AppPagination from '../../components/AppPagination.vue';
import AppTable from '../../components/AppTable.vue';
import Button from '../../components/Button.vue';
import ConfirmDialog from '../../components/ConfirmDialog.vue';
import SearchBar from '../../components/SearchBar.vue';
import Toast from '../../components/Toast.vue';
import http from '../../api/http';
import type { JenisStatus, PaginatedPegawai, Pegawai } from '../../types';

const router = useRouter();

const columns = [
  { key: 'nrp', label: 'NRP' },
  { key: 'nama_lengkap', label: 'Nama' },
  { key: 'email', label: 'Email Login' },
  { key: 'password', label: 'Kata Sandi' },
  { key: 'tanggal_masuk', label: 'Tanggal Masuk' },
  { key: 'jenis_status', label: 'Status' },
  { key: 'akhir_kontrak', label: 'Akhir Kontrak' },
  { key: 'jabatan', label: 'Jabatan' },
  { key: 'aksi', label: 'Aksi' }
];

const filters = reactive({
  search: '',
  page: 1,
  per_page: 10,
  sort: 'contract-expiring',
  status: 'all' as 'all' | JenisStatus
});

const sortOptions = [
  { label: 'Masa Kontrak (Segera Habis)', value: 'contract-expiring' },
  { label: 'NRP (Kecil ke Besar)', value: 'nrp' },
  { label: 'Nama A-Z', value: 'nama-asc' },
  { label: 'Nama Z-A', value: 'nama-desc' }
];

const statusFilterOptions = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Kontrak 1', value: 'Kontrak 1' },
  { label: 'Kontrak 2', value: 'Kontrak 2' },
  { label: 'Kontrak 3', value: 'Kontrak 3' },
  { label: 'Kontrak 4', value: 'Kontrak 4' },
  { label: 'Kontrak 5', value: 'Kontrak 5' },
  { label: 'Kontrak 6', value: 'Kontrak 6' },
  { label: 'Kontrak 7', value: 'Kontrak 7' },
  { label: 'Kontrak 8', value: 'Kontrak 8' },
  { label: 'Permanen', value: 'Permanen' }
];

const pegawai = ref<Pegawai[]>([]);
const meta = reactive({
  total: 0,
  per_page: 10,
  current_page: 1
});
const loading = ref(false);
const loadingDelete = ref(false);
const showConfirm = ref(false);
const selectedPegawai = ref<Pegawai | null>(null);
const toast = reactive({
  show: false,
  message: '',
  type: 'info' as 'success' | 'error' | 'info'
});
const deleteConfirmationCode = ref('');

const totalPages = computed(() => Math.ceil(meta.total / meta.per_page) || 1);

const formatDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const fetchPegawai = async () => {
  loading.value = true;
  try {
    const { data } = await http.get<PaginatedPegawai>('/api/pegawai', {
      params: {
        search: filters.search || undefined,
        page: filters.page,
        per_page: filters.per_page,
        sort: filters.sort,
        status: filters.status
      }
    });
    pegawai.value = data.data;
    meta.total = data.meta.total;
    meta.per_page = data.meta.per_page;
    meta.current_page = data.meta.current_page;
  } catch (error) {
    console.error('Gagal memuat data pegawai', error);
    showToast('Gagal memuat data pegawai.', 'error');
  } finally {
    loading.value = false;
  }
};

const changePage = (page: number) => {
  filters.page = page;
};

const goToCreate = () => router.push({ name: 'pegawai-create' });
const goToDetail = (id: number) => router.push({ name: 'pegawai-detail', params: { id } });
const goToEdit = (id: number) => router.push({ name: 'pegawai-edit', params: { id } });

const confirmDelete = (item: Pegawai) => {
  selectedPegawai.value = item;
  deleteConfirmationCode.value = generateConfirmationCode();
  showConfirm.value = true;
};

const executeDelete = async () => {
  if (!selectedPegawai.value) return;
  loadingDelete.value = true;
  try {
    await http.delete(`/api/pegawai/${selectedPegawai.value.id}`);
    showToast('Pegawai berhasil dihapus.', 'success');
    showConfirm.value = false;
    selectedPegawai.value = null;
    fetchPegawai();
  } catch (error) {
    console.error('Gagal menghapus pegawai', error);
    showToast('Terjadi kesalahan saat menghapus pegawai.', 'error');
  } finally {
    loadingDelete.value = false;
  }
};

const generateConfirmationCode = () => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i += 1) {
    const index = Math.floor(Math.random() * characters.length);
    result += characters[index];
  }
  return result;
};

const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  toast.message = message;
  toast.type = type;
  toast.show = true;
};

watch(
  () => [filters.search, filters.per_page, filters.sort, filters.status],
  () => {
    filters.page = 1;
    fetchPegawai();
  }
);

watch(
  () => filters.page,
  () => {
    fetchPegawai();
  }
);

onMounted(() => {
  fetchPegawai();
});
</script>
