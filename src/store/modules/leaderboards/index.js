import axios from 'axios'

const state = {
  teamLeaderboard: []
}

const actions = {
  LOAD_TEAM_PREVIEW: function ({ commit, state }, { tournId }) {
    console.log('team preview call', tournId)
    axios.get('/tournaments/' + tournId + '/leaderboards/team_previews.json').then((response) => {
      commit('SET_TEAM_PREVIEW', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_TEAM_LEADERBOARD: function ({ commit, state }, { tournId }) {
    axios.get('')
  },
}

const mutations = {
  SET_TEAM_PREVIEW: (state, { list }) => {
    state.teamLeaderboard = list
  },

}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}