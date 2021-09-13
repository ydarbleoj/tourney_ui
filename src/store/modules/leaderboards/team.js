import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  teamLeaderboard: [],
  teamInfo: {},
  teamPlayers: [],
  teamStats: {},
  teamImages: [],
  teamScorecard: [],
}

const plugins = [
  createPersistedState({
    paths: [
      'leaderboards.team.teamLeaderboard',
      'leaderboards.team.teamInfo',
      'leaderboards.team.teamPlayers',
      'leaderboards.team.teamData',
      'leaderboards.team.teamImages',
      'leaderboards.team.teamScorecards'
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
    // Consider moving these to the getters
    let info    = JSON.parse(list.info)
    let players = JSON.parse(list.players)
    let stats   = JSON.parse(list.stats)

    // let info = Object.keys(i).length === 0 ? {} : i.data.attributes
    // let players = Object.keys(p).length === 0 ? [] : p.data
    // let stats = Object.keys(s).length === 0 ? [] : s.data.attributes
    Vue.set(state, 'teamInfo', keys(info, {}).attributes)
    Vue.set(state, 'teamPlayers', keys(players, []))
    Vue.set(state, 'teamStats', keys(stats, []))
  }
}

const getters = {
  getTeamInfo: state => {
    return state.teamInfo
  },
  getTeamPlayers: state => {
    return state.teamPlayers
  },
  getTeamStats: state => {
    return state.teamStats
  },
  getTeamPageImage: state => {
    return state.teamInfo.new_course_id
  },
  getTeamPageCourseName: state => {
    return state.teamInfo.course_name
  },
  getTeamPageRoundNumber: state => {
    return state.teamInfo.round_number
  }
}

const keys = ((object, emptyObject) => {
  return Object.keys(object).length == 0 ? emptyObject : object.data
})

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  plugins,
  state
}
