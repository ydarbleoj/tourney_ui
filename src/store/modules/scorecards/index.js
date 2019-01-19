import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'


const state = {
  playerScorecard: [],
  scoreList: [],
  courseScorecard: {},
  userScore: {},
  userScorecards: [],
  rnd1scorecard: [],
  rnd2scorecard: [],
  rnd3scorecard: [],

}

const actions = {
  LOAD_SCORECARD: function ({ commit, state }, { tournId, tournRoundId }) {
    let options = { tournament_id: tournId, tournament_round_id: tournRoundId }
    return axios.get('/api/v2/rounds/scorecards.json', { params: options}).then((response) => {
      console.log('scorecards', response.data)
      commit('SET_SCORECARD', { list: response.data })
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
  ADMIN_CREATE_USER_SCORE: function ({ commit, state }, { scorecardId, scores }) {
    let options = { scorecard_id: scorecardId, user_score: scores}
    return axios.post('/api/v2/user_scores.json', options)
      .then((response) => {
        if (response.status == 200) {
          commit('UPDATE_ADMIN_SCORECARD', { list: response.data })
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
      }
    }, (err) => {
      console.log('send score error', err)
    })
  },
  USER_SCORECARD_LIST: function ({ commit, state }, { tournId, lbId }) {
    let options = { tournament_id: tournId, leaderboard_id: lbId }
    return axios.get('/api/v2/tournaments/admin/user_scorecards.json', { params: options }).then((response) => {
        commit('SET_USER_SCORECARDS', { list: response.data })
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
    state.playerScorecard = list.data['attributes']
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
    return
  },
  scoreListGetter: state => {
    return state.scoreList
  },
  scorecard: state => {
    return state.playerScorecard
  },
  score: state => {
    return state.userScore
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}

