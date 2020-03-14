import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '../store/index.js'
import leave from '../views/LeaveRequest.vue'
import newLeave from '../views/NewLeave.vue'
// import Employees from '../views/Employees.vue'
// import EmployeeEdit from '../views/EmployeeEdit.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Dashboard',
        icon: 'home',
        component: Dashboard,
        meta: {
            title: '',
            requiresAuth: true,
            nav: true
        },
        component: () =>
            import ('../views/Dashboard.vue')
    },
    {
        path: '/employees/:id',
        name: 'Edit',
        icon: 'account-badge',
        meta: {
            title: '',
            requiresAuth: true
        },
        component: () =>
            import ('../views/EmployeeEdit.vue')

    },
    {
        path: '/employees',
        name: 'Employees',
        icon: 'account-badge',
        meta: {
            title: 'Employees',
            requiresAuth: true,
            nav: true
        },
        component: () =>
            import ('../views/Employees.vue')

    },
    {
        path: '/attendance',
        name: 'Attendance',
        icon: 'calendar-check',
        meta: {
            title: 'Attendance',
            requiresAuth: true,
            nav: true
        },
        component: () =>
            import ('../views/Attendance.vue')
    },
    {
        path: '/applicants',
        name: 'Applicants',
        icon: 'file-document-box-search',
        meta: {
            title: '',
            requiresAuth: true,
            nav: true
        },
        component: () =>
            import ('../views/Applicants.vue')
    }, {
        path: '/offwork',
        name: 'Leave Request',
        icon: 'run-fast',
        meta: {
            title: 'Leave Request',
            requiresAuth: true,
            
            nav: true
        },
        component: leave,
        // component: () =>
        //     import('../views/LeaveRequest.vue')

    },
    {
        path: '/offwork/add',
        name: 'New Leave Request',
        icon: 'run-fast',
        meta: {
            title: 'Leave Request',
            requiresAuth: true,
            icon: 'run-fast',
        },
        component: newLeave,
    },
    {
        
        path: '/login',
        name: 'Login',
        icon: 'lock',
        meta: {
            title: 'Login'
        },
        component: () =>
            import ('../views/Login.vue')
    },
    {
        
        path: '/image',
        name: 'Image',
        icon: 'lock',
        meta: {
            title: 'Upload Image'
        },
        component: () =>
            import ('../views/Image.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // console.log(store.dispatch('checkLogin'))
        store.dispatch('user/checkLogin')
        if (!store.state.user.is_login) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
                component: () =>
                    import ('../views/Login.vue')
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router