import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MeetingsIndexPage from '@/components/meetings/MeetingsIndexPage.vue'
import MeetingInfoPage from '@/components/meetings/MeetingInfoPage.vue'
import EditMeetingPage from '@/components/meetings/EditMeetingPage.vue'
import ContactsIndexPage from '@/components/contacts/ContactsIndexPage.vue'
import EditContactPage from '@/components/contacts/EditContactPage.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/meetings',
        component: { template: '<router-view></router-view>' },
        alias: '/',
        children: [
            {
                path: '',
                component: MeetingsIndexPage,
                name: 'Meetings'
            },
            {
                path: 'create',
                component: EditMeetingPage,
                name: 'CreateMeeting'
            },
            {
                path: 'info/:id(\\d+)',
                component: MeetingInfoPage,
                name: 'MeetingInfo',
                props: route => ({
                    meetingId: route.params.id instanceof Array
                        ? parseInt(route.params.id[0], 10)
                        : parseInt(route.params.id, 10)
                })
            },
            {
                path: 'edit/:id(\\d+)',
                component: EditMeetingPage,
                name: 'EditMeeting',
                props: route => ({
                    meetingId: route.params.id instanceof Array
                        ? parseInt(route.params.id[0], 10)
                        : parseInt(route.params.id, 10)
                })
            }
        ]
    },
    {
        path: '/contacts',
        component: { template: '<router-view></router-view>' },
        children: [
            {
                path: '',
                component: ContactsIndexPage,
                name: 'Contacts'
            },
            {
                path: 'create',
                component: EditContactPage,
                name: 'CreateContact'
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
