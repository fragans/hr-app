import axios from 'axios';

const state = {
    day:{},
    days:[],
    loading:true,
    todayoff:[]
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
    },
    todayoff(state){
        return state.todayoff
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
            let ids=[];
            state.days.forEach(a => {
                ids.push(parseInt(a.id))
            });
            return axios.post('http://localhost:3000/outtoday',
            {
                emp_id: payload.emp_id,
                status: payload.status,
                date_start: payload.date_start,
                date_end: payload.date_end,
                // id:String(state.days.length+1 ),
                id:String(Math.max(...ids)+1)
                
            })
            .then(response=>{
                console.log(response)
            })
        })
    },
    fetchTodayOff({commit}){
        let date = new Date().toLocaleString('id').substr(0,10).split("/").join("-")
        let [day,month,year] = date.split('-')
        const nowDate = (year.split(" ").join("")+'-'+month.padStart(2, '0')+'-'+day.padStart(2, '0'));

        return axios.get(`http://localhost:3000/outtoday?date_start=${nowDate}`)
        .then(({data})=>{
            commit('setTodayOff',data)
        })
    },
    fetchById({commit},payload){
        return axios.get(`http://localhost:3000/outtoday/${payload}`)
        .then(({ data })=>{
            commit('setDay',data)
        })
    },
    editStatus({commit},payload){
        // console.log(payload)
        return axios.put(`http://localhost:3000/outtoday/${payload.id}`,
            {
                emp_id:payload.emp_id,
                date_start:payload.date_start,
                date_end:payload.date_end,
                status:payload.status,
            }
        ).
        then(response=>{
            console.log(response)
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
    setTodayOff(state,payload){
        state.todayoff = payload
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations,
    
}