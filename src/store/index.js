import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import scorecards from './modules/scorecards'
import leaderboards from './modules/leaderboards'
import admin from './modules/admin'
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
    inviteList: [],
    invited: [],
    courseMenuList: [],
    tournamentPlayers: [],
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
    strokeLeaderboard: [],
    skins_leaderboard: [],
    putting_leaderboard: [],
    teamLeaderboard: [],
    teamRounds: [],
    currentRound: '',
    teeTime: [],
    awaitingTees: [],
    handicapMessage: '',
    adminTeeTimes: [],
    user: {},
    moneyList: [],
  },
  actions: {
    CREATE_TOURNAMENT: function ({ commit, state }, { payload }) {
      return axios.post('/api/v2/tournaments.json', { tournament: payload }).then((response) => {
        commit('ROUND_CREATE', { list: response.data })
        if (response.data.success) {
          return true
        } else {
          return false
        }
      })
    },
    LOAD_ADMIN_PLAYERS: function ({ commit, state }, { tournId }) {
      let options = { tournament_id: tournId }
      return axios.get('/api/v2/tournaments/admin/users.json', { params: options }).then((response) => {
        console.log('rep', response)
        commit('SET_ADMIN_PLAYERS', { list: response.data })
      })
    },
    CREATE_TOURNAMENT_ROUNDS: function ({ commit, state }, { tournId, payload }) {
      let options = { tournament_id: tournId, round: payload}
      return axios.post('/api/v2/tournaments/rounds.json', options).then((response) => {
        if (response.data.success) {
          commit('CURRENT_TOURNAMENT', { list: response.data })
          return true
        } else {
          return false
        }

      })
    },
    UPDATE_PLAYER_ADMIN: function ({ commit, state }, { tournId, opts, lbId }) {
      opts['tournament_id'] = tournId
      return axios.put('/api/v2/tournaments/admin/users/' + lbId + '.json',  opts).then((response) => {
        if (response.data.success) {
          return true
        } else {
          return false
        }
      })
    },
    INVITE_USERS: function ({ commit, state }, { tournId, invitees }) {
      let options = { tournament_id: tournId, invitation: invitees }
      console.log('options', options)
      return axios.post('/api/v2/tournaments/admin/invitations.json', options).then((response) => {
        if (response.data.success) {
          commit('SET_ADMIN_PLAYERS', { list: response.data })
          return true
        } else {
          return false
        }
      })
    },
    UPDATE_HANDICAP: function ({ commit, state }, { tournId, leaderboardId, handicap }) {
      let options = { handicap: handicap }
      axios.put('/tournaments/' + tournId + '/leaderboards/' + leaderboardId + '.json', { params: options }).then((response) => {
        commit('SET_HANDICAP', { list: response.data })
      }, (err) => {
        commit('SET_HANDICAP', { list: response.data })
      })
    },
    LOAD_TEAM_LEADERBOARD: function ({ commit, state }, { tournId, roundId, preview }) {
      let options = { tournament_id: tournId, round_id: roundId, preview: preview }
      return axios.get('/api/v2/leaderboards/teams.json', { params: options }).then((response) => {
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
     return axios.get('/api/v2/tournaments.json').then((response) => {
        console.log('tournament', response.data)
        commit('CURRENT_TOURNAMENT', { list: response.data })
        commit('SET_TOURNAMENT_LIST', { list: response.data })
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
      return commit('RESET_CURRENT_TOURNAMENT', { list: payload })
    },
    UPDATE_CURRENT_ROUND: function ({ commit }, payload) {
      commit('CURRENT_ROUND', { list: payload})
    },
    UPDATE_ROUNDS: function ({ commit }, payload) {
      commit('SET_ROUNDS', { list: payload.rounds })
    },
    LOAD_ADMIN_TEE_TIME: function ({ commit, state }, { tournId, roundId }) {
      let options = { tournament_id: tournId, tournament_round_id: roundId }
      return axios.get('/api/v2/tournaments/admin/tee_times.json', { params: options }).then((response) => {
        console.log('tee_times', response)
        if (response.status === 200) {
          commit('SET_ADMIN_TEE_TIME', { list: response.data })
        }
      }, (err) => {
        console.log(err)
      })
    },
    CREATE_TEE_TIMES: function ({ commit, state }, { tournId, teeTimes }) {
      let options = { tournament_id: tournId, tee_time: teeTimes }
      return axios.post('/api/v2/tournaments/admin/tee_times.json', options).then((response) => {
        if (response.data.status === 200) {
          commit('SET_ADMIN_MESSAGE', { list: response.data })
        }
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
    ROUND_CREATE: (state, { list }) => {
      Vue.set(state, 'userInviteList', JSON.parse(list.user_list).data)
      Vue.set(state, 'courseMenuList', JSON.parse(list.course_list).data)
      Vue.set(state, 'currentTournament', JSON.parse(list.tournament).data)
    },
    SET_ADMIN_PLAYERS: (state, { list }) => {
      let inv = JSON.parse(list.invited).data
      let users = JSON.parse(list.users).data
      let arr = []

      arr.push(inv, users)
      arr = arr.flat()
      Vue.set(state, 'invited', JSON.parse(list.invited).data)
      Vue.set(state, 'inviteList', list.invitees)
      Vue.set(state, 'tournamentPlayers', arr)
    },
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
      state.roundOne = list.data[0]
      state.roundTwo = list.data[1]
      state.roundThree = list.data[2]
      state.rounds = list.data
    },
    CURRENT_ROUND: (state, { list }) => {
      state.currentRound = list
    },
    SET_STROKE_LEADERBOARD: (state, { list }) => {
      Vue.set(state, 'strokeLeaderboard', list.data)
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
      state.adminTeeTimes = JSON.parse(list.times).data
      Vue.set(state, 'awaitingTees', JSON.parse(list.awaiting).data)
    },
    ADD_USER_TEE_TIME: (state, { user, index, group }) => {
      console.log('user', state.adminTeeTimes[group])
      state.awaitingTees.splice(index, 1)
      state.adminTeeTimes[group].attributes.players.push(user)
    },
    ADD_USER_AWAITING: (state, { user, key, group }) => {
      state.adminTeeTimes = state.adminTeeTimes.map(tees => {
        if (tees.attributes.group === group) {
          tees.attributes.players.splice(key, 1)
        }
        return tees
      })
      console.log('user', user)
      state.awaitingTees.push(user)
    },
    SET_ADMIN_MESSAGE: (state, { list }) => {
      state.adminMessage = list
    },
    CURRENT_TOURNAMENT: (state, { list }) => {
      console.log('hiti', JSON.parse(list.tournament))
      Vue.set(state, 'currentTournament', JSON.parse(list.tournament).data.attributes)
      Vue.set(state, 'teamRounds', JSON.parse(list.tournament).data.attributes.round_info)
    },
    RESET_CURRENT_TOURNAMENT: (state, { list }) => {
      console.log('reset', list)
      Vue.set(state, 'currentTournament', list.attributes)
      Vue.set(state, 'teamRounds', list.attributes.round_info)
    },
    SET_TEAM_LEADERBOARD: (state, { list }) => {
      state.teamLeaderboard = list.data
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
      return state.strokeLeaderboard
    },
    getTournament: state => {
      return state.currentTournament
    },
    getTournaments: state => {
      return state.tournaments
    },
    userScorecardIds: state => userId => {
      return state.strokeLeaderboard
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
    // admin
  }
})

export default store
