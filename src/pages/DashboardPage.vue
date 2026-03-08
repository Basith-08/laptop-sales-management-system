<template>
    <section class="space-y-6">
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Overview</p>
            <h2 class="mt-2 text-2xl font-semibold text-slate-900">Sales Dashboard</h2>
            <p class="mt-2 text-sm text-slate-500">
                Ringkasan performa transaksi dari data terbaru.
            </p>
        </div>

        <div v-if="errorMessage" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {{ errorMessage }}
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <article v-for="item in metricCards" :key="item.label" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p class="text-sm font-medium text-slate-500">{{ item.label }}</p>
                <p class="mt-3 text-2xl font-semibold text-slate-900">
                    <span v-if="loading" class="inline-block h-8 w-24 animate-pulse rounded bg-slate-200" />
                    <span v-else>{{ item.value }}</span>
                </p>
            </article>
        </div>

        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h3 class="text-base font-semibold text-slate-900">Recent Transactions</h3>
                <router-link to="/transactions" class="text-sm font-medium text-slate-600 hover:text-slate-900">
                    Lihat semua
                </router-link>
            </div>

            <a-table
                :columns="columns"
                :data-source="recentTransactions"
                :loading="loading"
                :pagination="false"
                rowKey="id"
                class="[&_.ant-table-thead>tr>th]:!bg-slate-50 [&_.ant-table-thead>tr>th]:!text-slate-700"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getTransactions } from '../services/transactionService'
import type { Transaction } from '../types/transaction'

const transactions = ref<Transaction[]>([])
const loading = ref(true)
const errorMessage = ref('')

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(value)

const totalRevenue = computed(() =>
    transactions.value.reduce((sum, item) => sum + Number(item.total_price || 0), 0)
)

const totalPpn = computed(() =>
    transactions.value.reduce((sum, item) => sum + Number(item.ppn || 0), 0)
)

const totalPph = computed(() =>
    transactions.value.reduce((sum, item) => sum + Number(item.pph || 0), 0)
)

const totalItemsSold = computed(() =>
    transactions.value.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
)

const recentTransactions = computed(() => transactions.value.slice(0, 5))

const metricCards = computed(() => [
    { label: 'Total Revenue', value: formatCurrency(totalRevenue.value) },
    { label: 'Total Transactions', value: String(transactions.value.length) },
    { label: 'Total PPN', value: formatCurrency(totalPpn.value) },
    { label: 'Total PPh', value: formatCurrency(totalPph.value) },
    { label: 'Item Terjual', value: String(totalItemsSold.value) }
])

const columns = [
    { title: 'Date', dataIndex: 'transaction_date' },
    { title: 'Customer', dataIndex: 'customer_name' },
    { title: 'Brand', dataIndex: 'laptop_brand' },
    { title: 'Model', dataIndex: 'laptop_model' },
    {
        title: 'Total',
        dataIndex: 'total_price',
        customRender: ({ value }: { value: number }) => formatCurrency(Number(value || 0))
    }
]

const loadDashboard = async () => {
    loading.value = true
    errorMessage.value = ''

    try {
        transactions.value = await getTransactions()
    } catch {
        errorMessage.value = 'Gagal memuat data dashboard. Coba refresh halaman.'
    } finally {
        loading.value = false
    }
}

onMounted(loadDashboard)
</script>
