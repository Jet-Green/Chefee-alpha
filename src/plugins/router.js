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
        },
        {
            path: '/auth',
            name: 'AuthPage',
            component: () => import('../views/AuthPage.vue')
        }
    ],
    // scrollBehavior(to, from, savedPosition) {
    //     if ((to.name == 'TripsPage') || (to.name == 'TripInfoPage') || (to.name == 'CompanionsPage'))
    //         return { top: 0 }
    // }
})

export default router
