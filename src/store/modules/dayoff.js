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
        
        return axios.get('http://localhost:3000/outtoday')
        .then(({ data })=>{
            commit('setDays',data)
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
        
        

    },
    fetchById({commit},payload){
        return axios.get(`http://localhost:3000/outtoday/${payload}`)
        .then(({ data })=>{
            commit('setDay',data)
        })
    }
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