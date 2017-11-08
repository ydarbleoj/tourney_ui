import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    courses: [],
    tournaments: [],
    currentTournament: [],
    stroke_leaderboard: [],
    putting_leaderboard: [],
    currentRound: '',
    rounds: [],
  },
  actions: {
    LOAD_ROUNDS: function ({ commit, state }, { tourn_id }) {
      axios.get('/tournaments/' + tourn_id + '/rounds.json').then((response) => {
        commit('SET_ROUNDS', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_PUTTING_LEADERBOARD: function ({ commit, state }, { id }) {
      let options = {round: 1}
      console.log('calling', options)
      axios.get('/tournaments/' + id + '/putting_leaderboard.json', { params: options }).then((response) => {
        commit('SET_PUTTING_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_STROKE_LEADERBOARD: function ({ commit, state }, { id }) {
      axios.get('/tournaments/' + id + '/stroke_leaderboard.json').then((response) => {
        commit('SET_STROKE_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_TOURNAMENT_COURSE_LIST: function ({ commit, state }, { id }) {
      axios.get('/tournaments/' + id + '/new_courses.json').then((response) => {
        commit('SET_TOURNAMENT_COURSE_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_TOURNAMENT_LIST: function ({ commit }) {
      axios.get('/tournaments.json').then((response) => {
        commit('SET_TOURNAMENT_LIST', { list: response.data })
        commit('CURRENT_TOURNAMENT', { list: [response.data[0]] })
      }, (err) => {
        console.log(err)
      })
    },
    UPDATE_CURRENT_TOURNAMENT: function ({ commit }, payload) {
      commit('CURRENT_TOURNAMENT', { list: payload })
    }
  },
  mutations: {
    SET_ROUNDS: (state, { list }) => {
      state.rounds = list
    },
    SET_PUTTING_LEADERBOARD: (state, { list }) => {
      state.putting_leaderboard = list
    },
    SET_STROKE_LEADERBOARD: (state, { list }) => {
      state.stroke_leaderboard = list
    },
    SET_TOURNAMENT_COURSE_LIST: (state, { list }) => {
      state.courses = list
    },
    SET_TOURNAMENT_LIST: (state, { list }) => {
      state.tournaments = list
    },
    CURRENT_TOURNAMENT: (state, { list }) => {
      state.currentTournament = list
    }
  },
  getters: {
    openNewCourses: state => {
      return state.courses
    },
  },
  modules: {

  }
})

export default store
