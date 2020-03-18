
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
        return axios.get('http://localhost:3000/todaypresent')
        .then(({ data })=>{
            commit('setAttends',data)
            commit('setLoading',false)
        })
    },
    insert({dispatch,state},payload){
        console.log(payload)
        let time = new Date();
        
        dispatch('fetch').then(()=>{
            // console.log(state.attends)
            let day = new Date().toLocaleString('id').substr(0,10).split("/").join("-")
            let t = new Date().toLocaleTimeString('id').split(".").join(":");
            console.log(time)
            return axios.post('http://localhost:3000/todaypresent',
            {
                emp_id: String(payload),
                date: day,
                id:String(state.attends.length+1 ),
                time: t
                
            })
            .then(response=>{
                console.log(response)
            })
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