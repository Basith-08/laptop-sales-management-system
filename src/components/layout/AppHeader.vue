<template>
    <header class="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <p class="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Laptop Sales</p>
                <h1 class="text-lg font-semibold text-slate-900 sm:text-xl">{{ pageTitle }}</h1>
            </div>

            <div class="flex items-center gap-2 sm:gap-3">
                <div class="flex items-center gap-2 rounded-lg bg-slate-100 p-1 lg:hidden">
                    <router-link
                        to="/dashboard"
                        class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                        :class="route.path === '/dashboard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                    >
                        Dashboard
                    </router-link>
                    <router-link
                        to="/transactions"
                        class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                        :class="route.path === '/transactions' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                    >
                        Transactions
                    </router-link>
                </div>

                <a-button type="primary" danger class="!rounded-lg !font-medium" @click="logout">
                    Logout
                </a-button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../services/supabase'

const router = useRouter()
const route = useRoute()

const pageTitle = computed(() => {
    if (route.path === '/dashboard') return 'Financial Dashboard'
    if (route.path === '/transactions') return 'Transaction Management'

    return 'Laptop Sales'
})

const logout = async () => {
    await supabase.auth.signOut()
    router.push('/')
}
</script>
