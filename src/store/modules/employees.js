import axios from 'axios'
// import router from '../../router'z

const state = {

    persons: [],
    person: {},
    loading: true

}

const getters = {
    persons(state)
    {
        return state.persons
    },


    person(state)
    {
        return state.person
    },

    loading(state)
    {
        return state.loading
    }
}

const actions = {
    // buat fetch

    fetch({commit}, state)
    {
        return axios.get('http://localhost:3000/employees/').
        then(({ data })=>{
            // console.log(data)
            this.desserts = data
            this.copy = this.desserts
            // state.loading = false
            // console.log(data)
            commit('setEmployees', data)
            commit('setLoading')
        })
    },

    update(state,payload)
    {
        return axios.put(`http://localhost:3000/employees/${payload}`).
        then(response=>{
            console.log(response)
        })
        // console.log(payload)
    },

    fetchById({commit},payload){
        console.log("p = "+ payload)
        return axios.get(`http://localhost:3000/employees/${payload}`)
        .then(({ data })=>{
            commit('setEmployee',data)
            commit('setLoading')
        })
    }
}

const mutations = {
    
    setEmployees(state, payload)
    {
        state.persons = payload
    },

    updatePerson(state, payload)
    {
        console.log(payload)
        state.person.name = payload
    },

    setEmployee(state,payload){
        state.person= payload
    },

    setLoading(state)
    {
        state.loading = false
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations,

}