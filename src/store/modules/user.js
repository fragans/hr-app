import axios from 'axios'
// import router from '../../router'z

const state = {
    is_loading: true,
    user: '',
    is_login: false
}

const getters = {
    is_loading(state) {
        return state.is_loading
    },
}

const actions = {
// buat fetch
    userLogin({commit}, payload){
        
        // Do something here... lets say, a http call using vue-resource
        axios.get('https://jsonplaceholder.typicode.com/users/1').then(response => {
            console.log(response.data)
            console.log(payload)
            commit('setUser', response.data)
        }, error => {
            // http failed, let the calling function know that action did not work out
            reject(error)
        })
  },
  checkLogin({commit},state) {
    if (localStorage.getItem('login')) {
        commit('setUser',localStorage.getItem('login'))
    } else {
        state.is_login = false
    }
    return state.is_login;

},
}

const mutations = {
// 1 mutation 1 kerjaan (logic)
// buat ganti state
    login(state, payload) {
        axios
            .get('http://localhost:3000/user')
            .then(({ data }) => {
                if (data[0].username === payload.username && data[0].password === payload.password) {
                    localStorage.setItem('login', payload.username)
                    state.user = data[0].usernamme
                    state.is_login = true;
                    state.is_loading = false;
                } else {
                    alert('akun tidak ditemukan')
                }

            })

    },
    setUser(state,payload){
        state.is_login = true
        state.user = payload
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