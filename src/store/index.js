import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import employees from './modules/employees'
import attendance from './modules/attendance'
// import * as store from './modules';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        employees,
        attendance
    }
})