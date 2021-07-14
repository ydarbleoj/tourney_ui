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
  LOAD_TEAM_LEADERBOARD: function({ commit, state }, { tournamentId, roundId}) {
		let options = { tournament_id: tournamentId, round_id: roundId }

		return axios.get(
      'api/v3/leaderboards/teams.json', { params: options }
    ).then((res) => {
      commit("SET_TEAM_LEADERBOARD", { list: res.data })
    }, (err) => {
      console.log('error loading team page', err)
    })
  }
}

const mutations = {
  SET_TEAM_LEADERBOARD: (state, { list }) => {
		console.log("list", list.data)
    state.teamLeaderboard = list.data
  },
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
