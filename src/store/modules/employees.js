import axios from 'axios'
// import router from '../../router'z

const state = {

    persons: [],
    person: {},
    male: [],
    female: [],
    loading: true

}

const getters = {
    persons(state)
    {
        return state.persons
    },


    person(state)
    {
        return state.person
    },

    loading(state)
    {
        return state.loading
    },

    male(state)
    {
        return state.male
    },

    female(state)
    {
        return state.female
    }
}

const actions = {
    // buat fetch

    fetch({commit}, state)
    {
        return axios.get('http://localhost:3000/employees/').
        then(({ data })=>{
            // console.log(data)
            this.desserts = data
            this.copy = this.desserts
            // state.loading = false
            // console.log(data)
            commit('setEmployees', data)
            commit('setLoading')
        })
    },
    fetchMale({commit}, state)
    {
        return axios.get('http://localhost:3000/employees?gender=Male').
        then(({ data })=>{
            // console.log(data)
            this.desserts = data
            this.copy = this.desserts
            // state.loading = false
            // console.log(data)
            commit('setMale', data)
            commit('setLoading')
        })
    },
    fetchFemale({commit}, state)
    {
        return axios.get('http://localhost:3000/employees?gender=Female').
        then(({ data })=>{
            // console.log(data)
            this.desserts = data
            this.copy = this.desserts
            // state.loading = false
            // console.log(data)
            commit('setFemale', data)
            commit('setLoading')
        })
    },
    insert({commit,dispatch},payload){
        console.log(payload)
        dispatch('fetch').then(()=>{
            // console.log(state.applies)
            return axios.post('http://localhost:3000/employees',
            {
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                position: payload.position,
                division: payload.division,
                photo: payload.photo,
                status: "Probation",
                gender: payload.gender,
                address: payload.address,
                date: payload.date,
                emergency_contact: [
                    {
                    name: payload.emergency_contact[0].name,
                    phone: payload.emergency_contact[0].phone
                    }
                ],
                id:(state.persons.length+1 )                
            }
            )
            .then(response=>{
                console.log(response)
            })
        })

    },
    update(state,payload)
    {
        console.log(payload)
        return axios.put(`http://localhost:3000/employees/${payload.id}`,
            {
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
            }
        ).
        then(response=>{
            console.log(response)
        })
        console.log(payload)
    },

    fetchById({commit},payload){
        console.log("p = "+ payload)
        return axios.get(`http://localhost:3000/employees/${payload}`)
        .then(({ data })=>{
            commit('setEmployee',data)
            commit('setLoading')
        })
    },
    remove({commit},payload){
        console.log('remove')
        return axios.delete(`http://localhost:3000/employees/${payload}`)
        .then(({ data })=>{
           
        })
    }
}

const mutations = {
    
    setEmployees(state, payload)
    {
        state.persons = payload
    },

    updatePerson(state, payload)
    {
        console.log(payload)
        state.person.name = payload
    },

    setEmployee(state,payload){
        state.person= payload
    },
    setPersonPhoto(state,payload){
        state.person.photo = payload
    },

    setLoading(state)
    {
        state.loading = false
    },

    setMale(state, payload)
    {
        state.male = payload
    },
    setFemale(state, payload)
    {
        state.female = payload
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations,

}