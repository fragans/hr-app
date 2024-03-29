import axios from 'axios';
import router from '../../router'
const state = {
    apply:{},
    applies:[],
    loading: true
}

const getters = {
    applies(state){
        return state.applies
    },
    apply(state){
        return state.apply
    },
    loading(state)
    {
        return state.loading
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
            let ids=[];
            state.applies.forEach(a => {
                ids.push(parseInt(a.id))
            });
            console.log(ids)
            console.log(Math.max(...ids))
            return axios.post('http://localhost:3000/newApplicants',
            {
                id:String(Math.max(...ids)+1),
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                position: payload.position,
                division: payload.division,
                birth_date: payload.birth_date,
                birth_place: payload.birth_place,
                photo: payload.photo,
                status: "Unprocessed",
                gender: payload.gender,
                address: payload.address,
                emergency_contact:[
                    {
                        name: payload.name,
                        phone: payload.phone
                    }
                ],
                date: payload.date ,   
                cv:payload.cv
            }
            )
            .then(response=>{
                console.log(response)
            })
        })

    },

    update(state,payload)
    {
        // console.log(state.apply);
        // console.log("di fungsi update payload = "+payload.id)
        console.log("di fungsi update ")
        console.log(payload)
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
                cv: payload.cv,
                emergency_contact: [
                    {
                    name: payload.emergency_contact[0].name,
                    phone: payload.emergency_contact[0].phone
                    }
                ],
                
            }).
        then(response=>{
            console.log(response)
        })
    },
    fetchNewest({commit}){
        return axios.get(`http://localhost:3000/newApplicants?_sort=date&_order=desc`)
        .then(({data})=>{
            commit('setApplies',data);
        })
    },
    fetchById({commit},payload){
        return axios.get(`http://localhost:3000/newApplicants/${payload}`)
        .then(({ data })=>{
            commit('setApply',data)
            commit('setLoading')

        })
    },
    remove({commit},payload){
        return axios.delete(`http://localhost:3000/newApplicants/${payload}`)
        .then(response=>{
            console.log(response)
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
    setCV(state,payload){
        state.apply.cv = payload
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