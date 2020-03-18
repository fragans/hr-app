import axios from 'axios';

const state = {
    day:{},
    days:[],
    loading:true
}

const getters = {
    days(state){
        return state.days
    },
    day(state){
        return state.day
    },
    loading(state){
        return state.loading
    }
}
const actions = {
    fetch({commit}){
        
        return axios.get('http://localhost:3000/holidays')
        .then(({ data })=>{
            commit('setDays',data)
        })
    },
}

const mutations = {
    setDays(state,payload){
        state.days= payload
    },
    setDay(state, payload){
        state.day = payload
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