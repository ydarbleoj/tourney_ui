import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  summaryData: {},
  userSummaryData: {}
}

const actions = {
  LOAD_SUMMARY_DATA: async function ({ commit, state}, { tourn_id }) {
    try {
      const response = await axios.get('/api/v2/tournaments/summary.json', { tournament_id: tourn_id })
      if (response.status === 200) {
        commit('SET_SUMMARY_DATA', { list: response.data })
        return true
      }
      else {
        return false
      }
    }
    catch (err) {
      console.log('summary data')
    }
  },
}

const mutations = {
  SET_SUMMARY_DATA: (state, { list }) => {
    Vue.set(state, 'summaryData', JSON.parse(list.summary_data).data)
    Vue.set(state, 'userSummaryData', JSON.parse(list.user_data).data.attributes)
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}