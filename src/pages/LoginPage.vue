<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 py-10">
        <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
            <div class="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 md:grid-cols-2">
                <div class="hidden bg-slate-900 p-10 text-white md:flex md:flex-col md:justify-between">
                    <div>
                        <p class="text-sm uppercase tracking-[0.2em] text-slate-300">Laptop Sales System</p>
                        <h1 class="mt-4 text-3xl font-semibold leading-tight">
                            Kelola transaksi laptop lebih cepat.
                        </h1>
                        <p class="mt-4 text-sm text-slate-300">
                            Login untuk mengakses dashboard transaksi dan manajemen penjualan.
                        </p>
                    </div>
                    <p class="text-xs text-slate-400">Secure access powered by Supabase</p>
                </div>

                <div class="p-6 sm:p-10">
                    <h2 class="text-2xl font-semibold text-slate-900">Masuk</h2>
                    <p class="mt-2 text-sm text-slate-500">Silakan login dengan akun Anda.</p>

                    <a-card class="mt-6 rounded-2xl border-0 shadow-none">
                        <div class="space-y-4">
                            <a-input v-model:value="email" placeholder="Email" size="large" />
                            <a-input-password v-model:value="password" placeholder="Password" size="large" class="mt-5"/>
                            <a-button
                                type="primary"
                                size="large"
                                block
                                class="!h-11 !rounded-lg !font-medium"
                                @click="login"
                            >
                                Login
                            </a-button>
                        </div>
                    </a-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../services/supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()

const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (!error) router.push('/dashboard')
}
</script>
