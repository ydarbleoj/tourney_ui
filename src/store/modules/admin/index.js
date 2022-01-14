import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const state = {
  tournamentPlayers: [],
  adminPlayerPage: {}
}

const actions = {
  LOAD_ADMIN_PLAYERS: function ({ commit, state }, { tournId }) {
    return axios.get(
      `/api/v3/tournaments/${tournId}/admin/players.json`
    ).then((response) => {
      commit('SET_ADMIN_PLAYERS', { list: response.data })
    })
  },
  LOAD_PLAYER: function ({ commit, state }, { tournId, id}) {
    return axios.get(
      `/api/v3/tournaments/${tournId}/admin/players/${id}.json`
    ).then((response) => {
      commit('SET_ADMIN_PLAYER_PROFILE', { list: response.data })
    })
  },
  UPDATE_PLAYER: function ({ commit, state }, { tournId, opts, id}) {
    return axios.patch(
      `/api/v3/tournaments/${tournId}/admin/players/${id}.json`, opts
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
}

const mutations = {
  SET_ADMIN_PLAYERS: (state, { list }) => {
    const users = JSON.parse(list.users)
    state.tournamentPlayers = users.data
  },
  SET_ADMIN_PLAYER_PROFILE: (state, { list }) => {
    state.adminPlayerPage = list.data.attributes
  },
  SET_ADMIN_PLAYER_PROFILE: (state, { list }) => {
    state.adminPlayerPage = list.data.attributes
  },
  REMOVE_PLAYER: (state, { id }) => {
    const index = state.tournamentPlayers.findIndex(block => block.id === id )
    state.tournamentPlayers.splice(index, 1)
  },
}

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

