import axios from 'axios';

const state = {
    persons:[],
    loading:true
}

const getters = {
    persons(state){
        return state.persons
    },
    loading(state){
        return state.loading
    }
}
const actions = {
    fetch({commit}){
        
        return axios.get('http://localhost:3000/employees')
        .then(({ data })=>{
            commit('setEmployees',data)
            commit('setLoading',false)
        })
    },
}

const mutations = {
    setEmployees(state,payload){
        state.persons= payload
    },
    setLoading(state, payload){
        state.loading = payload
    },
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations,
    
}