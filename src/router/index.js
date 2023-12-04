import { createRouter, createWebHistory } from 'vue-router'
import Entry from '../views/Entry.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Entry
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/BackEntry',
      name: 'BackEntry',
      component: () => import('../views/Back/BackEntry.vue')
    },
    {
      path: '/BackAdd',
      name: 'BackAdd',
      component: () => import('../views/Back/BackAdd.vue')
    },
    {
      path: '/BackTopic',
      name: 'BackTopic',
      component: () => import('../views/Back/BackTopic.vue')
    },
  ]
})

export default router
