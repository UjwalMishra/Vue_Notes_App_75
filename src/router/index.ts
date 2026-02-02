import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NoteDetailView from '../views/NoteDetailView.vue'
import TagView from '../views/TagView.vue'
import ShareView from '../views/ShareView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/note/:id',
        name: 'note-detail',
        component: NoteDetailView
    },
    {
        path: '/tag/:tag',
        name: 'tag-view',
        component: TagView
    },
    {
        path: '/share/:id',
        name: 'share-view',
        component: ShareView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
