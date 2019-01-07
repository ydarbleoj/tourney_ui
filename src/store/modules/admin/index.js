import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const state = {
  tournamentPlayers: [],
}

const actions = {
  LOAD_ADMIN_PLAYERS: function ({ commit, state }, { tournId }) {
    let options = { tournament_id: tournId }
    return axios.get('/api/v2/tournaments/users', { params: options }).then((response) => {
      commit('SET_ADMIN_PLAYERS', { list: response.data })
    })
  }
}

const mutations = {
  SET_ADMIN_PLAYERS: (state, { list }) => {
    state.tournamentPlayers = list.data
  }
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

