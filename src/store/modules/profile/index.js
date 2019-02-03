import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  profileData: {},
}

const actions = {
  LOAD_PROFILE_DATA: function ({ commit, state}) {
    return axios.get('/api/v2/users/profiles').then(response => {
      commit('SET_PROFILE_DATA', { list: response.data })
    }, (err) => {
      console.log('profile data')
    })
  },
}

const mutations = {
  SET_PROFILE_DATA: (state, { list }) => {
    Vue.set(state, 'profileData', JSON.parse(list.user_data).data)
    Vue.set(state, 'user', JSON.parse(list.user).data.attributes)
  },
  RESET_USER: (state, { list }) => {
    Vue.set(state, 'user', list)
  },
}

const getters = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}