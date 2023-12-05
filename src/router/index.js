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
    {
      path: '/BackFeback',
      name: 'BackFeback',
      component: () => import('../views/Back/BackFeback.vue')
    },
    {
      path: '/BackCaculate',
      name: 'BackCaculate',
      component: () => import('../views/Back/BackCaculate.vue')
    },
    {
      path: '/BackQuestionCheck',
      name: 'BackQuestionCheck',
      component: () => import('../views/Back/BackQuestionCheck.vue')
    },
    {
      path: '/BackAnswerFeback',
      name: 'BackAnswerFeback',
      component: () => import('../views/Back/BackAnswerFeback.vue')
    },
    {
      path: '/FrontQuestion',
      name: 'FrontQuestion',
      component: () => import('../views/Front/FrontQuestion.vue')
    },
    {
      path: '/FrontQuestionCheck',
      name: 'FrontQuestionCheck',
      component: () => import('../views/Front/FrontQuestionCheck.vue')
    },
  ]
})

export default router
