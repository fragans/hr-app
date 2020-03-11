import axios from 'axios'
// import router from '../../router'

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


}

const mutations = {

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
    checkLogin() {
        if (localStorage.getItem('login')) {
            state.is_login = true
        } else {
            state.is_login = false
        }
        return state.is_login;

    },
    logout(state) {
        state.is_login = false;
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