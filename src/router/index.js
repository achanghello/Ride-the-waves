import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        redirect: '/pageone'
    },
    {
        path: '/pageone',
        component: () => import('../views/pageone'),
    },
    {
        path: '/pagetwo',
        component: () => import('../views/pagetwo'),
    },
    {
        path: '/pagethree',
        component: () => import('../views/pagethree'),
    },
    {
        path: '/pagefour',
        component: () => import('../views/pagefour'),
    }
]

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()


export default router
