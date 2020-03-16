import axios from 'axios';

const state = {
    apply:{},
    applies:[],
}

const getters = {
    applies(state){
        return state.applies
    },
    apply(state){
        return state.apply
    }
}
const actions = {
    fetch({commit}){
        
        return axios.get('http://localhost:3000/newApplicants')
        .then(({ data })=>{
            commit('setApplies',data)
        })
    },
    insert({commit,dispatch},payload){
        // console.log(payload)
        dispatch('fetch').then(()=>{
            console.log(state.apply)
            return axios.post('http://localhost:3000/newApplicants',
            {
                emp_id: payload.emp_id,
                status: payload.status,
                date: payload.date,
                id:(state.apply.length+1 ),
                
            })
            .then(response=>{
                console.log(response)
            })
        })
        
        

    },
    fetchById({commit},payload){
        return axios.get(`http://localhost:3000/newApplicants/${payload}`)
        .then(({ data })=>{
            commit('setApply',data)
        })
    }
}

const mutations = {
    setApplies(state,payload){
        state.applies= payload
    },
    setApply(state, payload){
        state.apply = payload
    },
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations,
    
}