import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import team from './team'

const state = {
  strokePreview: [],
  puttingPreview: [],
  skinsPreview: [],
  teamPreview: [],
  strokeLeaderboard: [],
  puttingLeaderboard: [],
  strokePlayer: {},
  puttingPurse: 0
}

const plugins = [
  createPersistedState({
    paths: [
      'leaderboards.strokeLeaderboard', 'puttingLeaderboard'
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
  LOAD_STROKE_LEADERBOARD: function ({ commit, state }, { id }) {
    let options = { tournament_id: id }
    return axios.get(
      '/api/v3/leaderboards/strokes.json', { params: options }
    ).then((response) => {
      commit('SET_STROKE_LEADERBOARD', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_STROKE_PLAYER: function ({ commit, state }, { tournId, id }) {
    let options = { tournament_id: tournId }
    return axios.get(
      `/api/v3/leaderboards/strokes/${id}.json`, { params: options }
    ).then((response) => {
      commit('SET_STROKE_PLAYER_PROFILE', { list: response.data })
    })
  },
  LOAD_PUTTING_LEADERBOARD: function ({ commit, state }, { id }) {
    let options = { tournament_id: id }
    return axios.get(
      '/api/v3/leaderboards/putting.json', { params: options }
    ).then((response) => {
      commit('SET_PUTTING_LEADERBOARD', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_PUTTING_PLAYER: function ({ commit, state }, { tournId, id }) {
    let options = { tournament_id: tournId }
    return axios.get(
      `/api/v3/leaderboards/putting/${id}.json`, { params: options }
    ).then((response) => {
      commit('SET_PUTTING_PLAYER_PROFILE', { list: response.data })
    })
  },
}

const mutations = {
  SET_PREVIEW_LEADERBOARDS: (state, { list }) => {
    let strokes = JSON.parse(list.stroke)
    let putting = JSON.parse(list.putting)
    let skins = JSON.parse(list.skins)
    let team = JSON.parse(list.team)

    Vue.set(state, 'strokePreview', keys(strokes))
    Vue.set(state, 'puttingPreview', keys(putting))
    Vue.set(state, 'skinsPreview', keys(skins))
    Vue.set(state, 'teamPreview', keys(team))
  },
  SET_TEAM_LEADERBOARD: (state, { list }) => {
    state.teamLeaderboard = list.data
  },
  SET_STROKE_LEADERBOARD: (state, { list }) => {
    Vue.set(state, 'strokeLeaderboard', list.data)
  },
  SET_STROKE_PLAYER_PROFILE: (state, { list }) => {
    state.strokePlayer = list.data.attributes
  },
  SET_PUTTING_LEADERBOARD: (state, { list }) => {
    const reducer = (acc, currentValue) => acc + currentValue;
    const threePutts = list.data.map(el => el.attributes.total_3_putts)
    const total = (threePutts.length == 0) ? 0 : threePutts.reduce(reducer)

    Vue.set(state, 'puttingPurse', total)
    Vue.set(state, 'puttingLeaderboard', list.data)
  },
  SET_PUTTING_PLAYER_PROFILE: (state, { list }) => {
    state.strokePlayer = list.data.attributes
  },
}

const getters = {
  getStrokePreview: state => {
    return state.strokePreview
  },
  getPuttingPreview: state => {
    return state.puttingPreview
  },
  getSkinsPreview: state => {
    return state.skinsPreview
  },
  getTeamPreview: state => {
    return state.teamPreview
  }
}

const keys = ((object) => {
  return Object.keys(object).length == 0 ? [] : object.data
})

export default {
  namespaced: true,
  actions,
  getters,
  modules: { team },
  mutations,
  plugins,
  state
}
