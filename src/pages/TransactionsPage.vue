<template>
    <section class="space-y-6">
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Transactions</p>
            <h2 class="mt-2 text-2xl font-semibold text-slate-900">Laptop Sales Transactions</h2>
            <p class="mt-2 text-sm text-slate-500">
                Kelola seluruh data penjualan laptop, termasuk update dan penambahan transaksi baru.
            </p>
        </div>

        <TransactionTable />
    </section>
</template>

<script setup lang="ts">
import TransactionTable from '../components/transaction/TransactionTable.vue'
</script>
