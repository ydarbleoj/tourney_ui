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
  skinsLeaderboard: [],
  strokePlayer: {},
  skinsPlayer: {},
  puttingPurse: 0,
  moneyPreview: [],
  moneyList: [],
  moneyPlayer: {}
}

const plugins = [
  createPersistedState({
    paths: []
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
  LOAD_SKINS: function ({ commit, state }, { id }) {
    let options = { tournament_id: id }
    return axios.get(
      '/api/v3/leaderboards/skins.json', { params: options }
    ).then((response) => {
      commit('SET_SKINS_LEADERBOARD', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_SKINS_PLAYER: function ({ commit, state }, { tournId, id }) {
    let options = { tournament_id: tournId }
    return axios.get(
      `/api/v3/leaderboards/skins/${id}.json`, { params: options }
    ).then((response) => {
      commit('SET_SKINS_PLAYER_PROFILE', { list: response.data })
    })
  },
  LOAD_MONEY: function ({ commit, state }, { id }) {
    let options = { tournament_id: id }
    return axios.get(
      '/api/v3/leaderboards/money_lists.json', { params: options }
    ).then((response) => {
      commit('SET_MONEY', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_MONEY_PLAYER: function ({ commit, state }, { tournId, id }) {
    let options = { tournament_id: tournId }
    return axios.get(
      `/api/v3/leaderboards/money_lists/${id}.json`, { params: options }
    ).then((response) => {
      commit('SET_MONEY_PLAYER_PROFILE', { list: response.data })
    })
  },
}

const mutations = {
  SET_PREVIEW_LEADERBOARDS: (state, { list }) => {
    const strokes = JSON.parse(list.stroke)
    const putting = JSON.parse(list.putting)
    const skins = JSON.parse(list.skins)
    const team = JSON.parse(list.team)
    const money = JSON.parse(list.money)

    Vue.set(state, 'strokePreview', keys(strokes))
    Vue.set(state, 'puttingPreview', keys(putting))
    Vue.set(state, 'skinsPreview', keys(skins))
    Vue.set(state, 'teamPreview', keys(team))
    Vue.set(state, 'moneyPreview', keys(money))
  },
  SET_TEAM_LEADERBOARD: (state, { list }) => {
    state.teamLeaderboard = list.data
  },
  SET_STROKE_LEADERBOARD: (state, { list }) => {
    Vue.set(state, 'strokeLeaderboard', list.data)
  },
  SET_PUTTING_LEADERBOARD: (state, { list }) => {
    const reducer = (acc, currentValue) => acc + currentValue;
    const threePutts = list.data.map(el => el.attributes.total_3_putts)
    const total = (threePutts.length == 0) ? 0 : threePutts.reduce(reducer)

    Vue.set(state, 'puttingPurse', total)
    Vue.set(state, 'puttingLeaderboard', list.data)
  },
  SET_SKINS_LEADERBOARD: (state, { list }) => {
    Vue.set(state, 'skinsLeaderboard', list.data)
  },
  SET_MONEY: (state, { list }) => {
    Vue.set(state, 'moneyList', list.data)
  },
  SET_STROKE_PLAYER_PROFILE: (state, { list }) => {
    state.strokePlayer = list.data.attributes
  },
  SET_PUTTING_PLAYER_PROFILE: (state, { list }) => {
    state.strokePlayer = list.data.attributes
  },
  SET_SKINS_PLAYER_PROFILE: (state, { list }) => {
    console.log('hi skins', list)
    state.skinsPlayer = list.data.attributes
  },
  SET_MONEY_PLAYER_PROFILE: (state, { list }) => {
    state.moneyPlayer = list.data.attributes
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
  },
  getMoneyPreview: state => {
    return state.moneyPreview
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
