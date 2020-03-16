import Vue from 'vue'
import Vuex from 'vuex'
import employees from './modules/employees'
import applicants from './modules/applicants'

import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        employees,
        applicants
    }
})