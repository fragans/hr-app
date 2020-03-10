import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Employees from '../views/Employees.vue'
import EmployeeEdit from '../views/EmployeeEdit.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Dashboard',
        icon: 'home',
        component: Dashboard
    },
    {
        path: '/employees/:id',
        name: 'Edit',
        icon: 'account-badge',
        component: EmployeeEdit,


    },
    {
        path: '/employees',
        name: 'Employees',
        icon: 'account-badge',
        component: Employees,


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
    mode:'history',
    routes
})

export default router