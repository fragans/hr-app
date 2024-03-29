import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '../store/index.js'



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
   
    {
        path: '/employees',
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
                {
                    name:'New Employee',
                    path: 'add',
                    icon:'mdi-run-fast'      ,
                    meta:{
                        title:'asue',
                        icon:'mdi-run-fast'      ,
                    },
                    component: () =>
                    import('../components/AddForm/NewEmployee.vue')
                },
            ],


    },
    {
        path: '/attendance',
        
        icon: 'calendar-check',
        meta: {
            title: 'Attendance',
            requiresAuth: true,
            nav: true
        },
        component: () =>
            import ('../views/Attendance.vue')
        ,children:[
            {
                name: 'Attendance',
                path:'',
                component: () =>
                import('../components/Parent/AllAttendance.vue')
            },
        ]
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
                name:'Edit Applicant',
                path: 'edit/:id',
                icon:'mdi-run-fast',
                meta:{
                    title:'asue',
                    icon:'mdi-run-fast',
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
                    requiresAuth: true,
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
                    requiresAuth: true,
                    title:'Edit Leave Status',
                    icon:'mdi-run-fast'      ,
                },
                component: () =>
                import('../components/Edit/EditLeave.vue')
            },
            {
                name: 'New Leave Request',
                path: 'add',
                meta: {
                    requiresAuth: false,
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
        
        path: '/welcome',
        name: 'Welcome',
        icon: 'lock',
        meta: {
            title: 'Welcome'
        },
        component: () =>
            import ('../views/Welcome.vue')
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
    {
        
        path: '/recruit',
        name: 'Apply Job',
        icon: 'account-tie',
        meta: {
            title: 'Apply for Job'
        },
        component: () =>
            import ('../views/Recruit.vue')
    },
    {
        
        path: '/clockin',
        name: 'Employee Clock In',
        icon: 'calendar-check',
        meta: {
            title: 'Employee Attendance'
        },
        component: () =>
            import ('../views/ClockIn.vue')
    },
    {
        
        path: '/clockout',
        name: 'Employee Clock Out',
        icon: 'calendar-remove',
        meta: {
            title: 'Employee Attendance'
        },
        component: () =>
            import ('../views/ClockOut.vue')
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
                // path: '/login',
                // query: { redirect: to.fullPath },
                // component: () =>
                //     import ('../views/Login.vue')
                path: '/welcome',
                query: { redirect: to.fullPath },
                component: () =>
                    import ('../views/Welcome.vue')
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router