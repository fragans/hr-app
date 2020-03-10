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
        path: '/employees',
        name: 'Employees',
        icon: 'account-badge',
        component: () =>
            import ('../views/Employees.vue'),
        children: [{
            path: 'edit/:id',
            name: 'Edit Employee',
            component: () =>
                import ('../views/EmployeeEdit.vue'),
        }, ]


    },
    {
        path: '/attendance',
        name: 'Attendance',
        icon: 'calendar-check',
        component: () =>
            import ('../views/Attendance.vue')
    },
    {
        path: '/applicants',
        name: 'Applicants',
        icon: 'file-document-box-search',
        component: () =>
            import ('../views/Applicants.vue')
    }, {
        path: '/offwork',
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