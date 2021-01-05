import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MeetingList from '@/components/meetings/MeetingsList.vue'
import CreateMeetingForm from '@/components/meetings/CreateMeetingForm.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'MeetingsList',
        component: MeetingList
    },
    {
        path: '/meetings/create',
        name: 'CreateMeeting',
        component: CreateMeetingForm
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
