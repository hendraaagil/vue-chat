import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '@/views/chat-view.vue'
import NotFound from '@/views/not-found.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/chat',
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
    },
    {
      path: '/chat/:roomId',
      name: 'chatRoom',
      component: ChatView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
