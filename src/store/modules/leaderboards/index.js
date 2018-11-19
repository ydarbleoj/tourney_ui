import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const state = {
  stroke_leaderboard: []
}

const actions = {
  LOAD_STROKE_LEADERBOARD: function ({ commit, state }, { id }) {
    let options = { tournament_id: id }
    axios.get('/api/v2/leaderboards/strokes.json', { params: options }).then((res) => {
      commit('SET_STROKE_LEADERBOARD', { list: res.data })
    }, (err) =>{
      console.log('error stroke leaderboard', err)
    })
  }
}

const mutations = {
  SET_STROKE_LEADERBOARD: (state, { list }) => {
    state.stroke_leaderboard = list.data
  },

}

const getters = {

}


export default {
  state,
  actions,
  mutations,
  getters
}