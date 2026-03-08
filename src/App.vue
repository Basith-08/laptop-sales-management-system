<template>
  <router-view v-if="isAuthPage" />

  <div v-else class="flex min-h-screen bg-slate-100 text-slate-900">
    <AppSidebar />

    <div class="flex min-w-0 flex-1 flex-col">
      <AppHeader />
      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppSidebar from './components/layout/AppSidebar.vue'
import AppHeader from './components/layout/AppHeader.vue'

const route = useRoute()

const isAuthPage = computed(() => route.path === '/')
</script>
