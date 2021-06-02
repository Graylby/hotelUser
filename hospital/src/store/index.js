import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    refreshToken:'',
    preDate:'',
    length:'',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    },
    setLength(state, length) {
      state.length = length;
    },
    setDate(state, perDate) {
      state.preDate = perDate;
    },
  },
  actions: {
    // 前端 登出   同样是在action中管理
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('setToken', '')
    //     commit('setRefreshToken','')
    //     resolve()
    //   })
    // },
  },
  modules: {
  }
})
