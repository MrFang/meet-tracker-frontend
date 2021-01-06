import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MeetingsIndex from '@/views/meetings/MeetingsIndex.vue'
import CreateMeetingForm from '@/components/meetings/CreateMeetingForm.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/meetings',
        component: { template: '<router-view></router-view>' },
        alias: '/',
        children: [
            {
                path: '',
                component: MeetingsIndex
            },
            {
                path: 'create',
                component: CreateMeetingForm
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active'
})

export default router
