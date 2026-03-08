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
import dayjs, { type Dayjs } from 'dayjs'
import { reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import { createTransaction, updateTransaction } from '../../services/transactionService'
import { calculateTransaction } from '../../utils/taxCalculator'
import type { Transaction } from '../../types/transaction'

const props = defineProps<{
    open: boolean
    editingData: Transaction | null
}>()

const emit = defineEmits(['update:open', 'saved'])

type TransactionFormState = {
    transaction_date: Dayjs | null
    customer_name: string
    laptop_brand: string
    laptop_model: string
    price: number
    quantity: number
}

const getInitialForm = (): TransactionFormState => ({
    transaction_date: null,
    customer_name: '',
    laptop_brand: '',
    laptop_model: '',
    price: 0,
    quantity: 1
})

const form = reactive<TransactionFormState>(getInitialForm())

const resetForm = () => {
    Object.assign(form, getInitialForm())
}

watch(
    [() => props.open, () => props.editingData],
    ([isOpen, data]) => {
        if (!isOpen) return

        if (data) {
            Object.assign(form, {
                transaction_date: data.transaction_date ? dayjs(data.transaction_date) : null,
                customer_name: data.customer_name,
                laptop_brand: data.laptop_brand,
                laptop_model: data.laptop_model,
                price: Number(data.price || 0),
                quantity: Number(data.quantity || 1)
            })
            return
        }

        resetForm()
    }
)

const close = () => {
    emit('update:open', false)
}

const submit = async () => {
    if (!form.transaction_date || !form.customer_name || !form.laptop_brand || !form.laptop_model) {
        message.error('Semua field wajib diisi')
        return
    }

    const calc = calculateTransaction(form.price, form.quantity)
    const payload = {
        transaction_date: form.transaction_date.format('YYYY-MM-DD'),
        customer_name: form.customer_name,
        laptop_brand: form.laptop_brand,
        laptop_model: form.laptop_model,
        price: form.price,
        quantity: form.quantity,
        ...calc
    }

    if (props.editingData) {
        await updateTransaction(props.editingData.id!, payload)
        message.success('Transaction updated')
    } else {
        await createTransaction(payload)
        message.success('Transaction created')
    }

    emit('saved')
    resetForm()
    close()
}
</script>
