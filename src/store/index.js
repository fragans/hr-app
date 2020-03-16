import Vue from 'vue'
import Vuex from 'vuex'
import applicants from './modules/applicants'
import user from './modules/user'
import employees from './modules/employees'
import attendance from './modules/attendance'
import dayoff from './modules/dayoff'
// import * as store from './modules';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        employees,
        applicants,
        dayoff,
        employees,
        attendance
    }
})