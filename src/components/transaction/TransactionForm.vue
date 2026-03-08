<template>
    <a-modal :open="open" :title="editingData ? 'Edit Transaction' : 'Add Transaction'" @cancel="close" @ok="submit">
        <a-form layout="vertical">
            <a-form-item label="Transaction Date">
                <a-date-picker v-model:value="form.transaction_date" style="width:100%" />
            </a-form-item>

            <a-form-item label="Customer Name">
                <a-input v-model:value="form.customer_name" />
            </a-form-item>

            <a-form-item label="Laptop Brand">
                <a-input v-model:value="form.laptop_brand" />
            </a-form-item>

            <a-form-item label="Laptop Model">
                <a-input v-model:value="form.laptop_model" />
            </a-form-item>

            <a-form-item label="Price">
                <a-input-number v-model:value="form.price" style="width:100%" />
            </a-form-item>

            <a-form-item label="Quantity">
                <a-input-number v-model:value="form.quantity" style="width:100%" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">

import { reactive, watch } from 'vue'
import { createTransaction, updateTransaction } from '../../services/transactionService'
import { calculateTransaction } from '../../utils/taxCalculator'
import type { Transaction } from '../../types/transaction'

const props = defineProps<{
    open: boolean
    editingData: Transaction | null
}>()

const emit = defineEmits(['update:open', 'saved'])

const form = reactive<any>({
    transaction_date: '',
    customer_name: '',
    laptop_brand: '',
    laptop_model: '',
    price: 0,
    quantity: 1
})

watch(() => props.editingData, (data) => {
    if (data) {
        Object.assign(form, data)
    }
})

const close = () => {
    emit('update:open', false)
}

const submit = async () => {
    const calc = calculateTransaction(form.price, form.quantity)
    const payload = {
        ...form,
        ...calc
    }
    if (props.editingData) {
        await updateTransaction(props.editingData.id!, payload)
    } else {
        await createTransaction(payload)
    }
    emit('saved')
    close()
}
</script>