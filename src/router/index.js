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
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/BackEntry',
      name: 'BackEntry',
      component: () => import('../views/BackEnd/BackEntry.vue')
    },
    {
      path: '/BackAdd',
      name: 'BackAdd',
      component: () => import('../views/BackEnd/BackAdd.vue')
    },
    {
      path: '/BackFeback',
      name: 'BackFeback',
      component: () => import('../views/BackEnd/BackFeback.vue')
    },
    {
      path: '/BackCaculate',
      name: 'BackCaculate',
      component: () => import('../views/BackEnd/BackCaculate.vue')
    },
    {
      path: '/BackQuestionCheck',
      name: 'BackQuestionCheck',
      component: () => import('../views/BackEnd/BackQuestionCheck.vue')
    },
    {
      path: '/BackAnswerFeback',
      name: 'BackAnswerFeback',
      component: () => import('../views/BackEnd/BackAnswerFeback.vue')
    },
    {
      path: '/FrontQuestion',
      name: 'FrontQuestion',
      component: () => import('../views/FrontEnd/FrontQuestion.vue')
    },
    {
      path: '/FrontQuestionCheck',
      name: 'FrontQuestionCheck',
      component: () => import('../views/FrontEnd/FrontQuestionCheck.vue')
    },
    {
      path: '/FrontCaculate',
      name: 'FrontCaculate',
      component: () => import('../views/FrontEnd/FrontCaculate.vue')
    },
  ]
})

export default router
