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
            <a-table :columns="columns" :data-source="transactions" rowKey="id" class="[&_.ant-table-thead>tr>th]:!bg-slate-50 [&_.ant-table-thead>tr>th]:!text-slate-700">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'actions'">
                        <div class="flex items-center gap-2">
                            <a-button
                                size="small"
                                class="!rounded-md"
                                @click="openEdit(record)"
                            >
                                Edit
                            </a-button>
                            <a-button
                                danger
                                size="small"
                                :disabled="!record.id"
                                :loading="deletingId === record.id"
                                class="!rounded-md"
                                @click="record.id && confirmDelete(record.id)"
                            >
                                Delete
                            </a-button>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>

        <TransactionForm v-model:open="open" :editingData="editingData" @saved="load" />
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { deleteTransaction, getTransactions } from '../../services/transactionService'
import type { Transaction } from '../../types/transaction'

import TransactionForm from './TransactionForm.vue'

const transactions = ref<Transaction[]>([])

const open = ref(false)
const deletingId = ref<string | null>(null)

const editingData = ref<Transaction | null>(null)

const columns = [
    { title: 'Customer', dataIndex: 'customer_name' },
    { title: 'Brand', dataIndex: 'laptop_brand' },
    { title: 'Model', dataIndex: 'laptop_model' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Qty', dataIndex: 'quantity' },
    { title: 'Total', dataIndex: 'total_price' },
    { title: 'Actions', key: 'actions', width: 180 }
]

const load = async () => {
    transactions.value = await getTransactions()
}

const openCreate = () => {
    editingData.value = null
    open.value = true
}

const openEdit = (record: Transaction) => {
    editingData.value = record
    open.value = true
}

const confirmDelete = (id: string) => {
    Modal.confirm({
        title: 'Delete transaction?',
        content: 'Data transaksi yang dihapus tidak bisa dikembalikan.',
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
            deletingId.value = id
            try {
                await deleteTransaction(id)
                message.success('Transaction deleted')
                await load()
            } catch {
                message.error('Failed to delete transaction')
            } finally {
                deletingId.value = null
            }
        }
    })
}

onMounted(load)
</script>
