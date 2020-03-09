import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Dashboard',
        icon: 'home',
        component: Dashboard
    },
    {
        path: '/Employees',
        name: 'Employees',
        icon: 'account-badge',
        component: () =>
            import ('../views/Employees.vue')
    },
    {
        path: '/Attendance',
        name: 'Attendance',
        icon: 'calendar-check',
        component: () =>
            import ('../views/Attendance.vue')
    },
    {
        path: '/Applicants',
        name: 'Applicants',
        icon: 'file-document-box-search',
        component: () =>
            import ('../views/Applicants.vue')
    }, {
        path: '/Leave Request',
        name: 'LeaveRequest',
        icon: 'run-fast',
        component: () =>
            import ('../views/LeaveRequest.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router