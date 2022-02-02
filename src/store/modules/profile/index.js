import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  userProfile: {},
  profileData: {},
  scorecards: [],
  scorecard: {}
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
  UPDATE_IMAGE: function ({ commit, state}, { image }) {
    console.log('hi', image)
    let options = { image: image }
    return axios.post(
      '/presigned_url', { direct_upload: options }
    ).then((resposne) => {
      return true
    }, (err) => {
      console.log('profile update error', err)
    })
  },
  LOAD_SCORECARDS: function ({ commit, state }) {
    return axios.get('/api/v3/profile/scorecards').then(response => {
      if (response.status === 200) {
        commit('SET_SCORECARD_DATA', { list: response.data })
        return true
      } else {
        return false
      }
    }, (err) => {
      console.log('profile data')
    })
  },
  LOAD_SCORECARD: function ({ commit, state }, { id }) {
    return axios.get(`/api/v3/profile/scorecards/${id}`).then(response => {
      if (response.status === 200) {
        commit('SET_SCORECARD', { list: response.data })
        return true
      } else {
        return false
      }
    }, (err) => {
      console.log('profile data')
    })
  }
}

const mutations = {
  SET_PROFILE_DATA: (state, { list }) => {
    Vue.set(state, 'profileData', JSON.parse(list.user_data).data)
    Vue.set(state, 'userProfile', JSON.parse(list.user).data.attributes)
  },
  RESET_USER: (state, { list }) => {
    Vue.set(state, 'user', list)
  },
  SET_SCORECARD_DATA: (state, { list }) => {
    const user = list.data.attributes
    const cards = user.grouped_scorecards

    Vue.set(state, 'scorecards', cards)
  },
  SET_SCORECARD: (state, { list }) => {
    console.log('set', list.data)

    Vue.set(state, 'scorecard', list.data.attributes)
  },
}

const getters = {
  getScorecard: state => {
    return state.scorecard
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}