import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../pages/dashboard'
import Network from '../pages/network'

const routes = [
    { path: '/', component: Dashboard, alias: '/home' },
    { path: '/net', component: Network }
]

const router = new createRouter({
    history: createWebHashHistory(),
    routes,
})

export {
    router
}