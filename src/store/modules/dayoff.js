import axios from 'axios';

const state = {
    day:[],
    loading:true
}

const getters = {
    day(state){
        return state.day
    },
    loading(state){
        return state.loading
    }
}
const actions = {
    fetch({commit}){
        
        return axios.get('http://localhost:3000/outtoday')
        .then(({ data })=>{
            commit('setDay',data)
        })
    },
    insert({commit,dispatch},payload){
        // console.log(payload)
        dispatch('fetch').then(()=>{
            console.log(state.day)
            return axios.post('http://localhost:3000/outtoday',
            {
                emp_id: payload.emp_id,
                status: payload.status,
                date: payload.date,
                id:(state.day.length+1 ),
                
            })
            .then(response=>{
                console.log(response)
            })
        })
        
        

    }
}

const mutations = {
    setDay(state,payload){
        state.day= payload
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