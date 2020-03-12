import axios from 'axios'
// import router from '../../router'z

const state = {
    is_loading: false,
    user: '',
    is_login: false
}

const getters = {
    is_loading(state) {
        return state.is_loading
    },
    is_login(state) {
        return state.is_login
    },
}

const actions = {
    // buat fetch
    userLogin({ commit }, payload) {
        commit('isLoading')
        const instance = axios.create({
            timeout: 5000,
            headers: {
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            },
            secure: true
        });
        
        instance.
        get('http://localhost:3000/user')
            .then(({ data }) => {
                if(data[0].password === payload.password){
                    commit('setUser', data[0])
                    commit('isLoading')
                    
                }
                

            }, error => {
                commit('isLoading')
                state.is_loading = false;
                // http failed, let the calling function know that action did not work out
                console.log(error)
            })
    },
    checkLogin({ commit }, state) {
        
        if (localStorage.getItem('login')) {
            commit('setUser', JSON.parse(localStorage.getItem('login')))
        } else {
            state.is_login = false
            commit('logout')
        }
        // return state.is_login;

    },
}

const mutations = {
    // 1 mutation 1 kerjaan (logic)
    // buat ganti state
    setUser(state, payload) {
        localStorage.setItem('login',JSON.stringify(payload))
        state.is_login = true
        // console.log(payload)
        state.user = payload
    },
    isLoading() {
        state.is_loading = !state.is_loading
    },
    logout(state) {
        state.is_login = false;
        state.user = ''
        localStorage.removeItem('login');
    },


}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}