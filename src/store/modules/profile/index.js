import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  userProfile: {},
  profileData: {},
}

const actions = {
  LOAD_PROFILE_DATA: function ({ commit, state}) {
    return axios.get('/api/v2/users/profiles').then(response => {
      if (response.status === 200) {
        commit('SET_PROFILE_DATA', { list: response.data })
        return true
      } else {
        return false
      }
    }, (err) => {
      console.log('profile data')
    })
  },
}

const mutations = {
  SET_PROFILE_DATA: (state, { list }) => {
    Vue.set(state, 'profileData', JSON.parse(list.user_data).data)
    Vue.set(state, 'userProfile', JSON.parse(list.user).data.attributes)
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