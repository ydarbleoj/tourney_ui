import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  tournamentPlayers: [],
  invited: [],
  adminPlayerPage: {},
  services: [],
  playerServices: {}
}

const actions = {
  LOAD_ADMIN_PLAYERS: function ({ commit, state }, { tournId }) {
    return axios.get(
      `/api/v3/tournaments/${tournId}/admin/players.json`
    ).then((response) => {
      commit('SET_ADMIN_PLAYERS', { list: response.data })
    })
  },
  LOAD_PLAYER: function ({ commit, state }, { tournId, id }) {
    return axios.get(
      `/api/v3/tournaments/${tournId}/admin/players/${id}.json`
    ).then((response) => {
      commit('SET_ADMIN_PLAYER_PROFILE', { list: response.data })
    })
  },
  UPDATE_PLAYER: function ({ commit, state }, { tournId, id, options}) {
    return axios.patch(
      `/api/v3/tournaments/${tournId}/admin/players/${id}.json`, options
    ).then((response) => {
      if (response.data.success) {
        return true
      } else {
        return false
      }
    })
  },
  DELETE_PLAYER: function ({ commit, state }, { tournId, id }) {
    return axios.delete(
      `/api/v3/tournaments/${tournId}/admin/players/${id}.json`
    ).then((response) => {
      if (response.status == 200) {
        commit('REMOVE_PLAYER', { id: response.data.id })
      }
      return response.success
    })
  },
  LOAD_SERVICES: function ({ commit, state }, { tournId }) {
    return axios.get(
      `/api/v3/tournaments/${tournId}/admin/service_monitors.json`
    ).then((response) => {
      commit('SET_ADMIN_SERVICES', { list: response.data })
    })
  },
  LOAD_PLAYER_SERVICES: function ({ commit, state }, { tournId, id }) {
    return axios.get(
      `/api/v3/tournaments/${tournId}/admin/service_monitors/${id}.json`
    ).then((response) => {
      commit('SET_PLAYER_SERVICE_PROFILE', { list: response.data })
    })
  },
}

const mutations = {
  SET_ADMIN_PLAYERS: (state, { list }) => {
    console.log('kajdhf', list)
    const users = JSON.parse(list.users)
    const invited = JSON.parse(list.invited)
    Vue.set(state, 'tournamentPlayers', [...keys(users), ...keys(invited)])
  },
  SET_ADMIN_PLAYER_PROFILE: (state, { list }) => {
    state.adminPlayerPage = list.data.attributes
  },
  REMOVE_PLAYER: (state, { id }) => {
    const index = state.tournamentPlayers.findIndex(block => block.id === id )
    state.tournamentPlayers.splice(index, 1)
  },
  SET_ADMIN_SERVICES: (state, { list }) => {
    state.services = list.data
  },
  SET_PLAYER_SERVICE_PROFILE: (state, { list }) => {
    state.playerServices = list.data.attributes
  },
}

const keys = ((object) => {
  return Object.keys(object).length == 0 ? [] : object.data
})

const getters = {

}

const namespaced = true;

export default {
  namespaced,
  state,
  actions,
  mutations,
  getters,
}

