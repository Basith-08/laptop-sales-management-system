<template>
    <section class="space-y-5">
        <div class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h2 class="text-xl font-semibold text-slate-900">Daftar Transaksi</h2>
                <p class="mt-1 text-sm text-slate-500">Pantau semua transaksi penjualan laptop.</p>
            </div>

            <a-button
                type="primary"
                size="large"
                class="!h-11 !rounded-lg !px-5 !font-medium"
                @click="openCreate"
            >
                Add Transaction
            </a-button>
        </div>

        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <a-table :columns="columns" :data-source="transactions" rowKey="id" class="[&_.ant-table-thead>tr>th]:!bg-slate-50 [&_.ant-table-thead>tr>th]:!text-slate-700" />
        </div>

        <TransactionForm v-model:open="open" :editingData="editingData" @saved="load" />
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTransactions } from '../../services/transactionService'
import type { Transaction } from '../../types/transaction'

import TransactionForm from './TransactionForm.vue'

const transactions = ref<Transaction[]>([])

const open = ref(false)

const editingData = ref<Transaction | null>(null)

const columns = [
    { title: 'Customer', dataIndex: 'customer_name' },
    { title: 'Brand', dataIndex: 'laptop_brand' },
    { title: 'Model', dataIndex: 'laptop_model' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Qty', dataIndex: 'quantity' },
    { title: 'Total', dataIndex: 'total_price' }
]

const load = async () => {
    transactions.value = await getTransactions()
}

const openCreate = () => {
    editingData.value = null
    open.value = true
}

onMounted(load)
</script>
