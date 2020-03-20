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
                id:(state.applies.length+1),
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                position: payload.position,
                division: payload.division,
                photo: "",
                status: "Unprocessed",
                gender: payload.gender,
                address: payload.address,
                emergency_contact:[
                    {
                        name: payload.name,
                        phone: payload.phone
                    }
                ],
                date: payload.date    
            }
            )
            .then(response=>{
                console.log(response)
            })
        })

    },

    updateStatusApplicant({commit}, payload)
    {
        // console.log("di applicant.js : "+payload)
        return axios.put(`http:localhost:3000/newApplicants/${payload.id}`,{
            id: payload.id,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            position: payload.position,
            division: payload.division,
            birth_date: payload.birth_date,
            birth_place: payload.birth_place,
            photo: payload.photo,
            status: payload.status,
            gender: payload.gender,
            address: payload.address,
            emergency_contact: [
                {
                name: payload.emergency_contact[0].name,
                phone: payload.emergency_contact[0].phone
                }
            ]
        }).then(response=>{console.log(response)})
    },

    update(state,payload)
    {
        // console.log("di fungsi update payload = "+payload.id)
        console.log("di fungsi update "+payload)
        return axios.put(`http://localhost:3000/newApplicants/${payload.id}`, 
            {
                id: payload.id,
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                position: payload.position,
                division: payload.division,
                birth_date: payload.birth_date,
                birth_place: payload.birth_place,
                photo: payload.photo,
                status: payload.status,
                gender: payload.gender,
                address: payload.address,
                emergency_contact: [
                    {
                    name: payload.emergency_contact[0].name,
                    phone: payload.emergency_contact[0].phone
                    }
                ]
            }).
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