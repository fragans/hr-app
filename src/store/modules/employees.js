import axios from 'axios';

const state = {
    persons:[],
    person:{},
    loading:true
}

const getters = {
    persons(state){
        return state.persons
    },
    person(state){
        return state.person
    },
    loading(state){
        return state.loading
    }
}
const actions = {
    fetch({commit},payload){
        
        return axios.get('http://localhost:3000/employees')
        .then(({ data })=>{
            commit('setEmployees',data)
            commit('setLoading',false)
        })
    },
    fetchById({commit},payload){
        return axios.get(`http://localhost:3000/employees/${payload}`)
        .then(({ data })=>{
            commit('setEmployee',data)
        })
    }
}

const mutations = {
    setEmployees(state,payload){
        state.persons= payload
    },
    setEmployee(state,payload){
        state.person= payload
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