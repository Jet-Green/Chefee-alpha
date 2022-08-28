import { createRouter, createWebHistory } from 'vue-router'
// import Landing from '../views/Landing.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: '/',
        //     name: 'Landing',
        //     component: Landing
        // },
        {
            path: '/',
            name: 'RecipesFeed',
            component: () => import('../views/RecipesFeed.vue')
        },
        {
            path: '/camera',
            name: 'Camera',
            component: () => import('../views/Camera.vue')
        },
        {
            path: '/recipe',
            name: 'RecipePage',
            component: () => import('../views/RecipePage.vue')
        },
        {
            path: '/reg',
            name: 'RegistrationPage',
            component: () => import('../views/RegistrationPage.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if ((to.name == 'RecipePage'))
            return { top: 0 }
        return savedPosition;
    }
})

export default router
