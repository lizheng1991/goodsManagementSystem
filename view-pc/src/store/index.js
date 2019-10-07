import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    auth: state => {
      return !!state.user.name
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
    },
    unlogin (state) {
      state.user = {}
    }
  }
})

export default store
