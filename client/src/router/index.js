import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/prompter',
    name: 'prompter',
    component: () => import('../components/PrompterView.vue'),
  },
  {
    path: '/remote',
    name: 'remote',
    component: () => import('../components/RemoteControl.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
