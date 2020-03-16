import axios from 'axios'
// import router from '../../router'z

const state = {
    persons: [],
    loading: true
}

const getters = {
    persons(state)
    {
        return state.persons
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
        return axios.get('http://localhost:3000/newApplicants').
        then(({ data })=>{
            // console.log(data)
            this.desserts = data
            this.copy = this.desserts
            // state.loading = false
            // console.log(data)
            commit('setApplicants', data)
            commit('setLoading')
        })
    },

    fetchPerson({commit}, state, payload)
    {
        return axios.get('http://localhost:3000/newApplicants/1').
        then(({ data })=>{
            // console.log(data)
            this.desserts = data
            this.copy = this.desserts
            // state.loading = false
            // console.log(data)
            commit('setApplicants', data)
            commit('setLoading')
        })
    }
}

const mutations = {
    
    setApplicants(state, payload)
    {
        state.persons = payload
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