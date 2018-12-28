import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import scorecards from './modules/scorecards'
import leaderboards from './modules/leaderboards'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'


Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({
      paths: ['currentTournament', 'tournaments', 'user']
    })

  ],
  state: {
    courses: [],
    currentCourse: [],
    courseStats: [],
    rounds: [],
    roundOne: {},
    roundTwo: {},
    roundThree: {},
    currentRound: [],
    tournaments: [],
    currentTournament: [],
    skins_leaderboard: [],
    putting_leaderboard: [],
    teamLeaderboard: [],
    currentRound: '',
    teeTime: [],
    teeTimes: [],
    awaitingTees: [],
    handicapMessage: '',
    adminTeeTimes: [],
    user: {},
    moneyList: [],
  },
  actions: {
    UPDATE_HANDICAP: function ({ commit, state }, { tournId, leaderboardId, handicap }) {
      let options = { handicap: handicap }
      axios.put('/tournaments/' + tournId + '/leaderboards/' + leaderboardId + '.json', { params: options }).then((response) => {
        commit('SET_HANDICAP', { list: response.data })
      }, (err) => {
        commit('SET_HANDICAP', { list: response.data })
      })
    },
    LOAD_TEAM_PREVIEW: function ({ commit, state }, { tournId }) {
      axios.get('/tournaments/' + tournId + '/leaderboards/teams/previews.json').then((response) => {
        commit('SET_TEAM_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_TEAM_LEADERBOARD: function ({ commit, state }, { tournId }) {
      axios.get('/tournaments/' + tournId + '/leaderboards/teams/totals.json').then((response) => {
        commit('SET_TEAM_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_COURSE_STATS: function ({ commit, state }, {tournId, roundId }) {
      let options = { tournament_id: tournId, tournament_round_id: roundId }
      console.log('options', options)
      return axios.get('/api/v2/rounds/courses.json', { params: options }).then((response) => {
        commit('SET_COURSE_STATS', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_SKINS: function ({ commit, state }, { id, preview }) {
      let options = { tournament_id: id, preview: preview  }
      return axios.get('/api/v2/leaderboards/skins.json', { params: options }).then((response) => {
        commit('SET_SKINS_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_PUTTING_LEADERBOARD: function ({ commit, state }, { id, preview }) {
      let options = { tournament_id: id, preview: preview }
      return axios.get('/api/v2/leaderboards/putts.json', { params: options}).then((response) => {
        commit('SET_PUTTING_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_STROKE_LEADERBOARD: function ({ commit, state }, { id, preview }) {
      let options = { tournament_id: id, preview: preview }
      return axios.get('/api/v2/leaderboards/strokes.json', { params: options }).then((response) => {
        commit('SET_STROKE_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_ROUNDS: function ({ commit, state }, { id }) {
      let options = { tournament_id: id }
      return axios.get('/api/v2/rounds/lists.json', { params: options }).then((response) => {
        commit('SET_ROUNDS', { list: response.data })
      }, (err) => {
        console.log('error in rounds', err)
      })
    },
    LOAD_COURSE: function ({ commit, state }, { tourn_id, id, roundNumber }) {
      let options = { round: roundNumber }
      axios.get('/tournaments/' + tourn_id + '/new_courses/' + id + '.json', { params: options }).then((response) => {
        commit('SET_COURSE', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_TOURNAMENT_LIST: function ({ commit }) {
      axios.get('/api/v2/tournaments.json').then((response) => {
        commit('CURRENT_TOURNAMENT', { list: response.data })
        commit('SET_TOURNAMENT_LIST', { list: response.data })
        // commit('SET_ROUNDS', { list: response.data[0].rounds })
        // commit('CURRENT_ROUND', { list: [response.data[0].rounds[0]] })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_MONEY_LIST: function ({ commit, state }, { tournId }) {
      axios.get('/tournaments/' + tournId + '/info/money_list/totals.json').then((response) => {
        commit('SET_MONEY_LIST', { list: response.data })
      }, (err) => {
        console.log('money list error', err)
      })
    },
    LOAD_MONEY_PREVIEW: function ({ commit, state }, { tournId }) {
      axios.get('/tournaments/' + tournId + '/info/money_list/previews.json').then((response) => {
        commit('SET_MONEY_LIST', { list: response.data })
      }, (err) => {
        console.log('money list error', err)
      })
    },
    UPDATE_CURRENT_TOURNAMENT: function ({ commit }, payload) {
      console.log('update crr', payload)
      commit('RESET_CURRENT_TOURNAMENT', { list: payload })
    },
    UPDATE_CURRENT_ROUND: function ({ commit }, payload) {
      commit('CURRENT_ROUND', { list: payload})
    },
    UPDATE_ROUNDS: function ({ commit }, payload) {
      commit('SET_ROUNDS', { list: payload.rounds })
    },
    LOAD_ADMIN_TEE_TIME: function ({ commit, state }, { tourn_id, roundNumber }) {
      let options = { round: roundNumber }
      axios.get('/tournaments/' + tourn_id + '/tee_times.json', { params: options }).then((response) => {
        commit('SET_ADMIN_TEE_TIME', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    CREATE_TEE_TIMES: function ({ commit, state }, { tournId, roundNumber, teeTimes }) {
      let options = { round: roundNumber, times: teeTimes }
      axios.post('/tournaments/' + tournId + '/tee_times.json', { params: options }).then((response) => {
        commit('SET_ADMIN_MESSAGE', { list: response.data })
      }, (err) => {
        commit('SET_ADMIN_MESSAGE', { list: response.data })
        console.log(err)
      })
    },
    UPDATE_ADMIN_TEE_TIME: function({ commit, state }, { tournId, roundNumber, teeTimes, id }) {
      let options = { round: roundNumber, times: teeTimes }
      axios.put('/tournaments/' + tournId + '/tee_times/' + id + '.json', { params: options }).then((response) => {
        commit('SET_ADMIN_MESSAGE', { list: response.data })
      }, (err) => {
        console.log('admin error', err)
        commit('SET_ADMIN_MESSAGE', { list: response.data })
      })
    },
    UPDATE_PROFILE_EDIT: function ({ commit }, payload) {
      console.log('edit pay', payload)
      // axios.get('/users/')
    },
  },
  mutations: {
    SET_HANDICAP: (state, { list }) => {
      state.handicapMessage = list
    },
    SET_COURSE_STATS: (state, { list }) => {
      state.courseStats = list
    },
    SET_SKINS_LEADERBOARD: (state, { list }) => {
      Vue.set(state, 'skins_leaderboard', list.data)
    },
    SET_ROUNDS: (state, { list }) => {
      console.log('round set', list.data)
      state.roundOne = list.data[0]
      state.roundTwo = list.data[1]
      state.roundThree = list.data[2]
      state.rounds = list.data
    },
    CURRENT_ROUND: (state, { list }) => {
      state.currentRound = list
    },
    SET_STROKE_LEADERBOARD: (state, { list }) => {
      Vue.set(state, 'stroke_leaderboard', list.data)
    },
    SET_PUTTING_LEADERBOARD: (state, { list }) => {
      Vue.set(state, 'putting_leaderboard', list.data)
    },
    SET_COURSE: (state, { list }) => {
      state.currentCourse = list[0]['course']
      state.teeTime = list[0]['tee_times']
    },
    SET_TOURNAMENT_LIST: (state, { list }) => {
      state.tournaments = list.data
    },
    SET_ADMIN_TEE_TIME: (state, { list }) => {
      state.adminTeeTimes = list[0]['times']
      state.awaitingTees = list[0]['awaiting']
    },
    SET_ADMIN_MESSAGE: (state, { list }) => {
      state.adminMessage = list
    },
    CURRENT_TOURNAMENT: (state, { list }) => {
      state.currentTournament = list.data[0]
    },
    RESET_CURRENT_TOURNAMENT: (state, { list }) => {
      state.currentTournament = list
    },
    SET_TEAM_LEADERBOARD: (state, { list }) => {
      state.teamLeaderboard = list
    },
    SET_MONEY_LIST: (state, { list }) => {
      state.moneyList = list
    },
  },
  getters: {
    openNewCourses: state => {
      return state.courses
    },
    getStrokeLeaderboard: state => {
      console.log('get', state.stroke_leaderboard)
      return state.stroke_leaderboard
    },
    getTournament: state => {
      return state.currentTournament
    },
    getTournaments: state => {
      return state.tournaments
    },
    userScorecardIds: state => userId => {
      console.log('user scorecards id', userId)
      return state.stroke_leaderboard
    },
    adminTeeTimeGetter: state => {
      return state.adminTeeTimes
    },
    adminMessageGetter: state => {
      return state.adminMessage
    }


  },
  modules: {
    scorecards,
  }
})

export default store
