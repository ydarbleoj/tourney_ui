import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const state = {
  tournamentPlayers: [],
}

const actions = {
  LOAD_ADMIN_PLAYERS: function ({ commit, state }, { tournId }) {
    let options = { tournament_id: tournId }
    return axios.get('/api/v2/tournament/admin', { params: options }).then((response) => {
      commit('SET_ADMIN_PLAYERS', response.data)
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

export default {
  state,
  actions,
  mutations,
  getters,
}

