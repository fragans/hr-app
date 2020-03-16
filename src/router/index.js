import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '../store/index.js'
import leave from '../views/LeaveRequest.vue'

// import Employees from '../views/Employees.vue'
// import EmployeeEdit from '../views/EmployeeEdit.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Dashboard',
        icon: 'home',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            requiresAuth: true,
            nav: true
        },
        component: () =>
            import ('../views/Dashboard.vue')
    },
    // {
    //     path: '/employees/:id',
    //     name: 'Edit',
    //     icon: 'account-group',
    //     meta: {
    //         title: '',
    //         requiresAuth: true
    //     },
    //     component: () =>
    //         import ('../views/EmployeeEdit.vue')

    // },
    {
        path: '/employees',
        name: 'Employees',
        icon: 'account-group',
        meta: {
            title: 'Employees',
            requiresAuth: true,
            nav: true
        },
        component: () =>
            import ('../views/Employees.vue'),
            children:[
                {
                    name:'Employees',
                    path: '',
                    icon: 'file-document-box-search',
                    meta:{
                        title:'Employees',
                        icon: 'file-document-box-search',
                    },
                    component: () =>
                    import('../components/Parent/AllEmployees.vue')
                },
                {
                    name:'Edit Employee',
                    path: '/edit/:id',
                    icon:'mdi-run-fast'      ,
                    meta:{
                        title:'asue',
                        icon:'mdi-run-fast'      ,
                    },
                    component: () =>
                    import('../components/Edit/EditEmployee.vue')
                },
            ],


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
        icon: 'account-multiple-plus',
        meta: {
            title: 'Applicants',
            requiresAuth: true,
            nav: true
        },
        component: () =>
            import ('../views/Applicants.vue')
            ,children:[
                {
                    name:'Applicants',
                    path: '',
                    icon: 'file-document-box-search',
                    meta:{
                        title:'Applicants',
                        icon: 'file-document-box-search',
                    },
                    component: () =>
                    import('../components/Parent/AllApplicants.vue')
                },
                {
                    name:'Edit Applicant Status',
                    path: 'edit/:id',
                    icon:'mdi-run-fast'      ,
                    meta:{
                        title:'asue',
                        icon:'mdi-run-fast'      ,
                    },
                    component: () =>
                    import('../components/Edit/EditApplicant.vue')
                },
                {
                    name: 'New Applicant',
                    path: 'add',
                    icon: 'run-fast',
                    meta: {
                        title: 'Leave Request',
                        icon: 'mdi-run-fast',
                    },
                    component: () =>
                    import('../components/AddForm/NewApplicant.vue')
                    
                },
            ],
    }, {
        path: '/offwork',
        icon:'run-fast',
        meta: {
            requiresAuth: true,
            nav: true,
            title:'Leave Request'
            
        },
        component: () =>
            import('../views/LeaveRequest.vue')
        ,children:[
            {
                name:'Leave Request',
                path: '',
                icon:'mdi-run-fast'      ,
                meta:{
                    title:'Leave Request',
                    icon:'mdi-run-fast'      ,
                },
                component: () =>
                import('../components/Parent/AllLeaveRequest.vue')
            },
            {
                name:'Edit Leave Status',
                path: 'edit/:id',
                icon:'mdi-run-fast'      ,
                meta:{
                    title:'asue',
                    icon:'mdi-run-fast'      ,
                },
                component: () =>
                import('../views/EditLeave.vue')
            },
            {
                name: 'New Leave Request',
                path: 'add',
                meta: {
                    title: 'Leave Request',
                    icon: 'run-fast',
                },
                component: () =>
                import('../components/AddForm/NewLeave.vue')
                
            },
        ],
        

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
    },
  

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