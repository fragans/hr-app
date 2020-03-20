import axios from 'axios';
import router from '../../router'
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
        console.log(payload)
        dispatch('fetch').then(()=>{
            // console.log(state.applies)
            return axios.post('http://localhost:3000/newApplicants',
            {
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                position: "",
                division: "",
                photo: "0",
                status: "Unprocessed",
                gender: payload.gender,
                address: payload.address,
                date: payload.date,
                id:(state.applies.length+1 )                
            }
            )
            .then(response=>{
                console.log(response)
            })
        })

    },

    update(state,payload)
    {
        // console.log("di fungsi update payload = "+payload.id)
        console.log("di fungsi update "+payload.status)
        return axios.put(`http://localhost:3000/newApplicants/`+payload.id, payload).
        then(response=>{
            console.log(response)
        })
    },

    fetchById({commit},payload){
        return axios.get(`http://localhost:3000/newApplicants/${payload}`)
        .then(({ data })=>{
            commit('setApply',data)

        })
    },
    remove({commit},payload){
        return axios.delete(`http://localhost:3000/newApplicants/${payload}`)
        .then(response=>{
            
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
    state,
    actions,
    mutations,
    getters

}