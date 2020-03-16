
import axios from 'axios';

const state = {
    attends:[],
    loading:true
}

const getters = {
    attends(state){
        return state.attends
    },
    loading(state){
        return state.loading
    }
}
const actions = {
    fetch({commit}){
        console.log('fetcing')
        return axios.get('http://localhost:3000/todaypresent')
        .then(({ data })=>{
            commit('setAttends',data)
            commit('setLoading',false)
        })
    },
}

const mutations = {
    setAttends(state,payload){
        state.attends= payload
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