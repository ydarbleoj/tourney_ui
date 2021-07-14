import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  strokePreview: [],
  puttingPreview: [],
  skinsPreview: [],
  teamPreview: [],
  teamLeaderboard: []
}

const plugins = [
  createPersistedState({
    paths: [
      'leaderboards.teamLeaderboard'
    ]
  })
]

const actions = {
  LOAD_PREVIEW_LEADERBOARD: function ({ commit, state }, { id }) {
    let options = { tournament_id: id }

    return axios.get(
      '/api/v3/leaderboards/previews.json',
      { params: options }
    ).then((res) => {
      commit('SET_PREVIEW_LEADERBOARDS', { list: res.data })
    }, (err) =>{
      console.log('error preview leaderboard', err)
    })
  },
  LOAD_TEAM_LEADERBOARD: function({ commit, state }, { tournamentId, roundId}) {
    return axios.get(
      'api/v3/leaderboards/teams.json',
      { params:
        { tournament_id: tournamentId, round_id: roundId }
      }
    ).then(() => {
      commit("SET_TEAM_LEADERBOARD", { list: res.data })
    }, (err) => {
      console.log('error loading team page', err)
    })
  }
}

const mutations = {
  SET_PREVIEW_LEADERBOARDS: (state, { list }) => {
    let strokes = JSON.parse(list.strokes)
    let putting = JSON.parse(list.putting)
    let skins = JSON.parse(list.skins)
    let team = JSON.parse(list.team)

    Vue.set(state, 'strokePreview', strokes)
    Vue.set(state, 'puttingPreview', putting)
    Vue.set(state, 'skinsPreview', skins)
    Vue.set(state, 'teamPreview', team)
  },
  SET_TEAM_LEADERBOARD: (state, { list }) => {
    state.teamLeaderboard = list.data
  },
}

const getters = {
  getStrokePreview: state => {
    return state.strokePreview.data
  },
  getPuttingPreview: state => {
    return state.puttingPreview.data
  },
  getSkinsPreview: state => {
    return state.skinsPreview.data
  },
  getTeamPreview: state => {
    return state.teamPreview.data
  }
}


export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  plugins,
  state
}