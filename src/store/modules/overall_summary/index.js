import axios from 'axios'
import Vue from 'vue'

const state = {
  tournamentSummary: {},
  courseSummary: {},
  userSummary: {}
}

const actions = {
  LOAD_SUMMARY_DATA: async function ({ commit, state}, { id }) {
    return axios.get(
      `/api/v3/tournaments/${id}/summary.json`
    ).then((response) => {
      commit('SET_SUMMARY_DATA', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
}

const mutations = {
  SET_SUMMARY_DATA: (state, { list }) => {
    const tournament = JSON.parse(list.tournament)
    console.log('hi', tournament);

    Vue.set(state, 'tournamentSummary', keys(tournament))
    Vue.set(state, 'userSummary', list.user)
  }
}

const keys = ((object) => {
  return Object.keys(object).length == 0 ? [] : object.data
})

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}