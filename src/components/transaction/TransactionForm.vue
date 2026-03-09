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

type TransactionPayload = Omit<Transaction, 'id' | 'created_at'>

const WEBHOOK_URL = import.meta.env.VITE_NEW_TRANSACTION_WEBHOOK_URL

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

const mapEditingDataToForm = (data: Transaction) => ({
    transaction_date: data.transaction_date ? dayjs(data.transaction_date) : null,
    customer_name: data.customer_name,
    laptop_brand: data.laptop_brand,
    laptop_model: data.laptop_model,
    price: Number(data.price || 0),
    quantity: Number(data.quantity || 1)
})

const isFormInvalid = () =>
    !form.transaction_date || !form.customer_name || !form.laptop_brand || !form.laptop_model

const buildPayload = (): TransactionPayload => {
    const calc = calculateTransaction(form.price, form.quantity)

    return {
        transaction_date: form.transaction_date!.format('YYYY-MM-DD'),
        customer_name: form.customer_name,
        laptop_brand: form.laptop_brand,
        laptop_model: form.laptop_model,
        price: form.price,
        quantity: form.quantity,
        ...calc
    }
}

const notifyWebhook = async (payload: TransactionPayload) => {
    if (!WEBHOOK_URL) return

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer_name: form.customer_name,
                laptop_model: form.laptop_model,
                total_price: payload.total_price
            })
        })
    } catch (error) {
        console.error('Failed to send webhook new-transaction:', error)
    }
}

watch(
    [() => props.open, () => props.editingData],
    ([isOpen, data]) => {
        if (!isOpen) return

        if (data) {
            Object.assign(form, mapEditingDataToForm(data))
            return
        }

        resetForm()
    }
)

const close = () => {
    emit('update:open', false)
}

const submit = async () => {
    if (isFormInvalid()) {
        message.error('Semua field wajib diisi')
        return
    }

    const payload = buildPayload()

    try {
        if (props.editingData) {
            await updateTransaction(props.editingData.id!, payload)
            message.success('Transaction updated')
        } else {
            await createTransaction(payload)
            message.success('Transaction created')
        }
    } catch {
        message.error('Failed to save transaction')
        return
    }

    await notifyWebhook(payload)
    emit('saved')
    resetForm()
    close()
}
</script>
