import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import MeetingsIndexPage from '@/components/meetings/MeetingsIndexPage.vue'
import MeetingInfoPage from '@/components/meetings/MeetingInfoPage.vue'
import EditMeetingPage from '@/components/meetings/EditMeetingPage.vue'
import ContactsIndexPage from '@/components/contacts/ContactsIndexPage.vue'
import EditContactPage from '@/components/contacts/EditContactPage.vue'
import ContactInfoPage from '@/components/contacts/ContactInfoPage.vue'
import LoginPage from '@/components/auth/LoginPage.vue'
import RegisterPage from '@/components/auth/RegisterPage.vue'
import GridLayout from '@/layouts/Grid/GridLayout.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/meetings',
        component: ContentLayout,
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
        component: ContentLayout,
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
            },
            {
                path: 'info/:id(\\d+)',
                component: ContactInfoPage,
                name: 'ContactInfo',
                props: route => ({
                    contactId: route.params.id instanceof Array
                        ? parseInt(route.params.id[0], 10)
                        : parseInt(route.params.id, 10)
                })
            },
            {
                path: 'edit/:id(\\d+)',
                component: EditContactPage,
                name: 'EditContact',
                props: route => ({
                    contactId: route.params.id instanceof Array
                        ? parseInt(route.params.id[0], 10)
                        : parseInt(route.params.id, 10)
                })
            }
        ]
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                component: LoginPage,
                name: 'Login'
            },
            {
                path: '/register',
                component: RegisterPage,
                name: 'Register'
            }
        ]
    },
    {
        path: '/grid',
        component: GridLayout
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active'
})

export default router
