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

    fetchPerson({commit}, state, payload)
    {
        return axios.get('http://localhost:3000/employees/1').
        // return axios.get(`http://localhost:3000/employees/state.employees.id)}`)
        // return axios.get(`http://localhost:3000/employees/1`)
        then(({ data })=>{
            commit('setProfile', data)
            commit('setLoading')
        })

    },

    update(state,payload)
    {
        // console.log(payload)
        return axios.put('http://localhost:3000/employees/1', payload ).
        then(response=>{
            console.log(response)
        })
        // console.log(payload)
    }
}

const mutations = {
    
    setEmployees(state, payload)
    {
        state.persons = payload
    },

    setProfile(state, payload)
    {
        state.person = payload
    },

    updatePerson(state, payload)
    {
        console.log(payload)
        state.person.name = payload
    },

    setLoading(state)
    {
        state.loading = false
    }

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}