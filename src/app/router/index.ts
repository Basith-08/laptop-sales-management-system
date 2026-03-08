import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../../pages/LoginPage.vue'
import TransactionsPage from '../../pages/TransactionsPage.vue'
import DashboardPage from '../../pages/DashboardPage.vue'

const routes = [
  {
    path: '/',
    component: LoginPage
  },
  {
    path: '/dashboard',
    component: DashboardPage
  },
  {
    path: '/transactions',
    component: TransactionsPage
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
