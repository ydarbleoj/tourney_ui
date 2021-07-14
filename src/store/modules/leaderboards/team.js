import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  teamLeaderboard: []
}

const plugins = [
  createPersistedState({
    paths: [
      'leaderboards.team.teamLeaderboard'
    ]
  })
]

const actions = {
  LOAD_TEAM_LEADERBOARD: function({ commit, state }, { tournamentId, roundNum }) {
		let options = { tournament_id: tournamentId, round_number: roundNum }

		return axios.get(
      'api/v3/leaderboards/teams.json', { params: options }
    ).then((res) => {
      commit("SET_TEAM_LEADERBOARD", { list: res.data })
    }, (err) => {
      console.log('error loading team page', err)
    })
  },
  LOAD_TEAM_PAGE: function({ commit, state }, { tournamentId, teamId }) {
    let options = { tournament_id: tournamentId }

    return axios.get(
      `api/v3/leaderboards/teams/${teamId}.json`, { params: options }
    ).then((res) => {
      commit("SET_TEAM_PAGE", { list: res.data })
    }, (err) => {
      console.log('error loading team page', err)
    })
  }
}

const mutations = {
  SET_TEAM_LEADERBOARD: (state, { list }) => {
    state.teamLeaderboard = list.data
  },
  SET_TEAM_PAGE: (state, { list }) => {
    console.log('hitss', list)
  }
}

const getters = {
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  plugins,
  state
}
