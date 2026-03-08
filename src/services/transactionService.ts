import { supabase } from './supabase'
import type { Transaction } from '../types/transaction'

export const getTransactions = async () => {

    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error

    return data
}

export const createTransaction = async (payload: Transaction) => {

    const { data, error } = await supabase
        .from('transactions')
        .insert([payload])

    if (error) throw error

    return data
}

export const updateTransaction = async (id: string, payload: Partial<Transaction>) => {

    const { data, error } = await supabase
        .from('transactions')
        .update(payload)
        .eq('id', id)

    if (error) throw error

    return data
}

export const deleteTransaction = async (id: string) => {

    const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)

    if (error) throw error
}