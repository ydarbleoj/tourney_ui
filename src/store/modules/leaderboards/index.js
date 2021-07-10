import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  strokePreview: [],
  puttingPreview: [],
  skinsPreview: []
}

const actions = {
  LOAD_PREVIEW_LEADERBOARD: function ({ commit, state }, { id }) {
    let options = { tournament_id: id }

    return axios.get(
      '/api/v3/leaderboards/previews.json',
      { params: options }
    ).then((res) => {
      commit('SET_PREVIEW_LEADERBOARDS', { list: res.data })
    }, (err) =>{
      console.log('error stroke leaderboard', err)
    })
  }
}

const mutations = {
  SET_PREVIEW_LEADERBOARDS: (state, { list }) => {
    let strokes = JSON.parse(list.strokes)
    let putting = JSON.parse(list.putting)
    let skins = JSON.parse(list.skins)

    Vue.set(state, 'strokePreview', strokes)
    Vue.set(state, 'puttingPreview', putting)
    Vue.set(state, 'skinsPreview', skins)
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
  }
}


export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}