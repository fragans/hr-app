
import axios from 'axios';

const state = {
    attends:[],
    attend:{},
    loading:true
}

const getters = {
    attends(state){
        return state.attends
    },
    attend(state){
        return state.attend
    },
    loading(state){
        return state.loading
    },
    
}
const actions = {
    fetch({commit}){
        return axios.get('http://localhost:3000/todaypresent')
        .then(({ data })=>{
            commit('setAttends',data)
            commit('setLoading',false)
        })
    },
    clockIn({dispatch,state},payload){
        console.log(payload)        
        dispatch('fetch').then(()=>{
            console.log(state.attends.length)
            let ids=[];
            state.attends.forEach(a => {
                ids.push(parseInt(a.id))
            });
            return axios.post('http://localhost:3000/todaypresent',
            {
                // id:String(state.attends.length+1 ),
                id: String(Math.max(...ids)+1),
                emp_id: String(payload.id),
                date: payload.date,
                in: payload.time,
                out:''
                
            })
            .then(response=>{
                console.log(response)
            })
        })
    },
    clockOut({dispatch,state,commit},payload){
        console.log(payload)
        let time = new Date();
        
        dispatch('fetch').then(()=>{
            // console.log(state.attends)
            let find = state.attends.filter(at => at.emp_id === String(payload.id) && at.date == String(payload.date))
            // console.log(find.length)
            if (find.length <= 0) return
            commit('setAttend',find[0]);
            console.log(find[0])
            return axios.put(`http://localhost:3000/todaypresent/${find[0].id}/`,
            {
                emp_id: payload.id,
                date: payload.date,
                in: find[0].in,
                out: payload.time,
                
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
    setAttend(state,payload){
        state.attend = payload
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations,
    
}