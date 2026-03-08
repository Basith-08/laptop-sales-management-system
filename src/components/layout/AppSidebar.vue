<template>
    <aside class="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div class="border-b border-slate-200 px-6 py-6">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Laptop Sales</p>
            <h2 class="mt-2 text-xl font-semibold text-slate-900">Management System</h2>
        </div>

        <nav class="flex-1 space-y-2 px-4 py-5">
            <router-link v-for="item in navItems" :key="item.to" :to="item.to" custom v-slot="{ href, navigate, isActive }">
                <a
                    :href="href"
                    @click="navigate"
                    class="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                    :class="isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
                >
                    <span>{{ item.label }}</span>
                    <span class="rounded-md px-2 py-0.5 text-xs" :class="isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'">
                        {{ item.short }}
                    </span>
                </a>
            </router-link>
        </nav>

        <div class="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
            Internal financial dashboard
        </div>
    </aside>
</template>

<script setup lang="ts">
const navItems = [
    { to: '/dashboard', label: 'Dashboard', short: 'DB' },
    { to: '/transactions', label: 'Transactions', short: 'TR' }
]
</script>
