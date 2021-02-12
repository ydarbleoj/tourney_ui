import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'


const state = {
  playerScorecard: [],
  scoreList: [],
  courseScorecard: {},
  userScore: {},
  userScorecards: [],
  teamCard: []
}

const plugins = [
  createPersistedState({
    paths: [
      'scorecards.playerScorecard',
      'scorecards.scorecard',
      'scorecards.getHoleInfo',
      'scorecards.teamCard'
    ]
  })
]

const actions = {
  LOAD_SCORECARD: function ({ commit, state }, { tournId, tournRoundId, teamId }) {
    let options = {
      tournament_id: tournId,
      tournament_round_id: tournRoundId,
      team_id: teamId
    }

    return axios.get(
      '/api/v2/rounds/scorecards.json',
      { params: options}
    ).then((response) => {
      commit('SET_SCORECARD', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_TEAM_SCORECARD: function ({ commit, state }, { tournId, team_id }) {
    let options = {
      tournament_id: tournId
    }

    return axios.get(
      '/api/v2/rounds/team_scorecards/' + team_id + '.json',
      { params: options}
    ).then((response) => {
      commit('SET_TEAM_SCORECARD', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_USER_SCORES: function ({ commit, state }, { scorecardId }) {
    axios.get('/scorecards/' + scorecardId + '/user_scores.json').then((response) => {
      commit('SET_SCORE_LIST', { list: response.data })
    }, (err) => {
      console.log('set score', err)
    })
  },
  LOAD_USER_SCORE: function ({ commit, state }, { scorecard_id, score_id }) {
    axios.get('/scorecards/' + scorecard_id + '/user_scores/' + score_id + '.json').then((response) => {
      commit('SET_SCORE', { list: response.data })
    }, (err) => {
      console.log('set score', err)
    })
  },
  CREATE_USER_SCORE: function ({ commit, state }, { scorecardId, scores }) {
    let options = { scorecard_id: scorecardId, user_score: scores}
    return axios.post('/api/v2/user_scores.json', options)
      .then((response) => {
        if (response.status == 200) {
          commit('SET_SCORECARD', { list: response.data })
          return true
        } else {
          return false
        }
      }, (err) => {
        console.log('send score error', err)
    })
  },
  UPDATE_USER_SCORE: function ({ commit, state }, { scorecardId, scoreId, scores }) {
    let options = { scorecard_id: scorecardId, user_score_id: scoreId, user_score: scores }
    return axios.put('/api/v2/user_scores/' + scoreId + '.json', options).then((response) => {
      if (response.status === 200) {
        commit('SET_SCORECARD', { list: response.data })
        return true
      } else {
        return false
      }
    }, (err) => {
      console.log('send score error', err)
      return false
    })
  },
  FINISH_SCORECARD: function({ commit, state }, { tournId, scorecardId, opts }) {
    let options = { tournament_id: tournId, scorecard: { finished: opts } }
    return axios.put('/api/v2/rounds/scorecards/' + scorecardId + '.json', options)
      .then((response) => {
        if (response.status === 200) {
          return true
        } else {
          return false
        }
      })
  },
  USER_SCORECARD_LIST: function ({ commit, state }, { tournId, lbId }) {
    let options = { tournament_id: tournId, leaderboard_id: lbId }
    return axios.get('/api/v2/tournaments/admin/user_scorecards.json', { params: options }).then((response) => {
        commit('SET_USER_SCORECARDS', { list: response.data })
      })
  },
  ADMIN_CREATE_USER_SCORE: function ({ commit, state }, { scorecardId, scores }) {
    let options = { scorecard_id: scorecardId, user_score: scores}
    return axios.post('/api/v2/user_scores.json', options)
      .then((response) => {
        if (response.status == 200) {
          commit('UPDATE_ADMIN_SCORECARD', { list: response.data })
          return true
        } else {
          return false
        }
      }, (err) => {
        console.log('send score error', err)
    })
  },
  ADMIN_UPDATE_USER_SCORE: function ({ commit, state }, { scorecardId, scoreId, scores }) {
    let options = { scorecard_id: scorecardId, user_score_id: scoreId, user_score: scores }
    return axios.put('/api/v2/user_scores/' + scoreId + '.json', options).then((response) => {
      if (response.status === 200) {
        commit('UPDATE_ADMIN_SCORECARD', { list: response.data })
        return true
      } else {
        return false
      }
    }, (err) => {
      console.log('send score error', err)
    })
  },
}

const mutations = {
  SET_USER_SCORECARDS: (state, { list }) => {
    Vue.set(state, 'userScorecards', list.included)
  },
  UPDATE_ADMIN_SCORECARD: (state, { list }) => {
    state.userScorecards = state.userScorecards.map(scorecard => {
      if (scorecard.id === list.data.id) {
        return Object.assign({}, scorecard, list.data)
      }
      return scorecard
    })
  },
  SET_SCORECARD: (state, { list }) => {
    console.log("card", list)
    state.playerScorecard = list.data === null ? {} : list.data['attributes']
  },
  SET_TEAM_SCORECARD: (state, { list }) => {
    state.teamCard = list.data === null ? {} : list.data['attributes']
  },
  SET_SCORE_LIST: (state, { list }) => {
    state.scoreList = list
  },
  SET_SCORE: (state, { list }) => {
    state.userScore = list
  },
  SET_LOADING: (state, { list }) => {
    state.loading = list
  }
}

const getters = {
  roundScorecard: (state) => (num) => {
  },
  scorecard: state => {
    return state.playerScorecard
  },
  getTeamCard: state => {
    return state.teamCard
  },
  score: state => {
    return state.userScore
  },
  getHoleInfo: state => num => {
    return state.playerScorecard.holes.filter(hole => num == hole.number)
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

