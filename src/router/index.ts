// src\router\index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AccountView from '@/views/AccountView.vue'
import ProfileView from '@/views/ProfileView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/authentication',
    name: 'account',
    component: AccountView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
