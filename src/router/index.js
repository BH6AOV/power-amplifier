import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../pages/dashboard'
import Serial from '../pages/serial'

const routes = [
    { path: '/', component: Dashboard, alias: '/home' },
    { path: '/serial', component: Serial }
]

const router = new createRouter({
    history: createWebHashHistory(),
    routes,
})

export {
    router
}