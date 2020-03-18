import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import employees from './modules/employees'
import attendance from './modules/attendance'
import applicants from './modules/applicants'
import dayoff from './modules/dayoff'
import holidays from './modules/holidays'
// import * as store from './modules';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        dayoff,
        employees,
        attendance,
        applicants,
        holidays
    }
})