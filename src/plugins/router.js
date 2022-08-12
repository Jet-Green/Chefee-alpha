import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/recipes',
            name: 'Recipes',
            component: () => import('../views/Recipes.vue')
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
            path: '/registration',
            name: 'RegistrationPage',
            component: () => import('../views/RegistrationPage.vue')
        }
    ],
    // scrollBehavior(to, from, savedPosition) {
    //     if ((to.name == 'TripsPage') || (to.name == 'TripInfoPage') || (to.name == 'CompanionsPage'))
    //         return { top: 0 }
    // }
})

export default router
