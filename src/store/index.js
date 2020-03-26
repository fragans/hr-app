import Vue from 'vue'
import Vuex from 'vuex'
import applicants from './modules/applicants'
import user from './modules/user'
import employees from './modules/employees'
import attendance from './modules/attendance'
import dayoff from './modules/dayoff'
import holidays from './modules/holidays'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        employees,
        applicants,
        dayoff,
        employees,
        attendance,
        applicants,
        holidays,
    }
})