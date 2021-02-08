import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  tournaments: [],
  currentTournament: [],
  currentRoundInfo: []
}

const plugins = [
  createPersistedState({
    paths: [
      'tournament.tournaments',
      'tournament.currentTournament',
    ]
  })
]

const actions = {
  LOAD_TOURNAMENT_LIST: function ({ commit }) {
    return axios.get('/api/v2/tournaments.json').then((response) => {
      commit('CURRENT_TOURNAMENT', { list: response.data })
      commit('SET_TOURNAMENT_LIST', { list: response.data })
    }, (err) => {
       console.log(err)
    })
  },
  UPDATE_CURRENT_TOURNAMENT: function ({ commit }, payload) {
    return commit('RESET_CURRENT_TOURNAMENT', { list: payload })
  },
}

const mutations = {
  SET_TOURNAMENT_LIST: (state, { list }) => {
    Vue.set(state, 'tournaments', JSON.parse(list.tournament).data)
  },
  CURRENT_TOURNAMENT: (state, { list }) => {
    let tourn = JSON.parse(list.tournament).data.pop()
    Vue.set(state, 'currentTournament', tourn.attributes)
    Vue.set(state, 'currentRoundInfo', tourn.attributes.round_info)
  },
  RESET_CURRENT_TOURNAMENT: (state, { list }) => {
    console.log('store', list)
    Vue.set(state, 'currentTournament', list.attributes)
    // Vue.set(state, 'currentRoundInfo', list.attributes.round_info)
  },
}

const getters = {
  getTournamentById: state => id => {
    return state.tournaments.filter(tourn => console.log(tourn))
  },
  getTournament: state => {
    return state.currentTournament
  },
  getTournaments: state => {
    return state.tournaments
  },
  getCurrentRoundInfo: state => {
    // return this.tournaments.filter(el => el.attributes.year === this.currentTournament.year)
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