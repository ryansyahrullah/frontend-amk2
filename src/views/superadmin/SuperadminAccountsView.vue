<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">Kelola Role Pegawai</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Pantau kredensial pegawai dan atur role tambahan seperti admin HCGS, finance, atau officer site.
        </p>
      </div>
    </div>

    <div class="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-primary dark:border-primary/30 dark:bg-primary/5">
      <p class="font-semibold">Catatan</p>
      <p class="mt-1 text-primary/80 dark:text-primary/70">
        Setiap akun selalu memiliki role <span class="font-semibold">Pegawai</span> untuk mengakses biodata pribadi.
        Tambahkan atau hapus role tambahan sesuai kebutuhan pekerjaan.
      </p>
    </div>

    <SearchBar
      v-model:search="filters.search"
      v-model:perPage="filters.perPage"
      :per-page-options="[10, 20, 50]"
    />

    <AppTable
      :columns="columns"
      :items="paginatedAccounts"
      :loading="loading"
      row-key="id"
      empty-message="Belum ada akun pegawai yang terdaftar."
    >
      <template #cell-nrp="{ item }">
        <span class="font-mono text-sm text-slate-700 dark:text-slate-200">{{ item.nrp ?? '-' }}</span>
      </template>
      <template #cell-password="{ item }">
        <span class="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {{ item.password }}
        </span>
      </template>
      <template #cell-roles="{ item }">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="role in displayRoles(item.roles)"
            :key="role"
            class="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary/90"
          >
            {{ roleLabel(role) }}
          </span>
        </div>
      </template>
      <template #cell-actions="{ item }">
        <div class="flex flex-wrap gap-2 md:justify-end">
          <Button size="sm" variant="ghost" @click="openCredentialDialog(item)">
            Ubah Akun
          </Button>
          <Button size="sm" variant="secondary" @click="openRoleDialog(item)">
            Kelola Role
          </Button>
        </div>
      </template>
    </AppTable>

    <AppPagination
      v-if="totalItems > 0"
      :current-page="filters.page"
      :total-pages="totalPages"
      :total-items="totalItems"
      @change="handlePageChange"
    />

    <RoleAssignmentDialog
      v-model="showRoleDialog"
      :account="selectedAccount"
      :saving="savingRoles"
      :available-roles="roleOptions"
      @save="handleSaveRoles"
    />

    <CredentialEditorDialog
      v-model="showCredentialDialog"
      :account="selectedAccount"
      :saving="savingCredentials"
      @save="handleSaveCredentials"
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
import AppTable from '../../components/AppTable.vue';
import Button from '../../components/Button.vue';
import CredentialEditorDialog from '../../components/CredentialEditorDialog.vue';
import RoleAssignmentDialog from '../../components/RoleAssignmentDialog.vue';
import Toast from '../../components/Toast.vue';
import AppPagination from '../../components/AppPagination.vue';
import SearchBar from '../../components/SearchBar.vue';
import http from '../../api/http';
import type { ManagedAccount, ManagedCredentialPayload, UserRole } from '../../types';
import { roleLabelMap, roleDescriptionMap } from '../../constants/roles';

const columns = [
  { key: 'nrp', label: 'NRP' },
  { key: 'nama', label: 'Nama Pegawai' },
  { key: 'email', label: 'Email' },
  { key: 'password', label: 'Password' },
  { key: 'roles', label: 'Role Aktif' },
  { key: 'actions', label: 'Aksi', align: 'right' as const }
];

const accounts = ref<ManagedAccount[]>([]);
const loading = ref(false);
const showRoleDialog = ref(false);
const savingRoles = ref(false);
const showCredentialDialog = ref(false);
const savingCredentials = ref(false);
const selectedAccount = ref<ManagedAccount | null>(null);

const filters = reactive({
  search: '',
  perPage: 10,
  page: 1
});

const filteredAccounts = computed(() => {
  if (!filters.search) return accounts.value;
  const keyword = filters.search.toLowerCase();
  return accounts.value.filter((account) => {
    return (
      account.nama.toLowerCase().includes(keyword) ||
      (account.nrp ? account.nrp.toLowerCase().includes(keyword) : false)
    );
  });
});

const totalItems = computed(() => filteredAccounts.value.length);

const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / filters.perPage)));

const paginatedAccounts = computed(() => {
  const start = (filters.page - 1) * filters.perPage;
  return filteredAccounts.value.slice(start, start + filters.perPage);
});

const toast = ref({
  show: false,
  message: '',
  type: 'info' as 'success' | 'error' | 'info'
});

const assignableRoles: UserRole[] = ['admin_hcgs', 'admin_finance', 'officer_site'];

const roleOptions = assignableRoles.map((role) => ({
  value: role,
  label: roleLabelMap[role],
  description: roleDescriptionMap[role]
}));

const roleLabel = (role: UserRole) => roleLabelMap[role] ?? role;

const displayRoles = (roles: UserRole[]) => {
  const unique = new Set<UserRole>(roles);
  if (!unique.has('pegawai')) {
    unique.add('pegawai');
  }
  return Array.from(unique);
};

const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  toast.value = { show: true, message, type };
};

const fetchAccounts = async () => {
  loading.value = true;
  try {
    const { data } = await http.get<ManagedAccount[]>('/api/superadmin/accounts');
    accounts.value = data;
  } catch (error) {
    console.error('Gagal memuat akun pegawai', error);
    showToast('Gagal memuat data akun pegawai.', 'error');
  } finally {
    loading.value = false;
  }
};

const openRoleDialog = (account: ManagedAccount) => {
  selectedAccount.value = account;
  showRoleDialog.value = true;
};

const openCredentialDialog = (account: ManagedAccount) => {
  selectedAccount.value = account;
  showCredentialDialog.value = true;
};

const handlePageChange = (page: number) => {
  filters.page = page;
};

watch(
  () => [filters.search, filters.perPage],
  () => {
    filters.page = 1;
  }
);

watch(totalPages, (value) => {
  if (filters.page > value) {
    filters.page = value;
  }
});

const handleSaveRoles = async (roles: UserRole[]) => {
  if (!selectedAccount.value) return;
  savingRoles.value = true;
  try {
    const { data } = await http.put<ManagedAccount>(
      `/api/superadmin/accounts/${selectedAccount.value.id}/roles`,
      { roles }
    );
    const index = accounts.value.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      accounts.value[index] = data;
    }
    selectedAccount.value = data;
    showToast('Role pegawai berhasil diperbarui.', 'success');
    showRoleDialog.value = false;
  } catch (error) {
    console.error('Gagal memperbarui role pegawai', error);
    showToast('Gagal memperbarui role pegawai.', 'error');
  } finally {
    savingRoles.value = false;
  }
};

const handleSaveCredentials = async (payload: ManagedCredentialPayload) => {
  if (!selectedAccount.value) return;
  savingCredentials.value = true;
  try {
    const { data } = await http.put<ManagedAccount>(
      `/api/superadmin/accounts/${selectedAccount.value.id}/credentials`,
      payload
    );
    const index = accounts.value.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      accounts.value[index] = data;
    }
    selectedAccount.value = data;
    showToast('Email dan kata sandi berhasil diperbarui.', 'success');
    showCredentialDialog.value = false;
  } catch (error) {
    console.error('Gagal memperbarui kredensial pegawai', error);
    showToast('Gagal memperbarui email atau kata sandi.', 'error');
  } finally {
    savingCredentials.value = false;
  }
};

onMounted(() => {
  fetchAccounts();
});
</script>
