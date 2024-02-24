import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

const keys = ((object) => {
  return Object.keys(object).length == 0 ? [] : object.data
})

export const useScorecardsStore = defineStore('scorecards', {
	state: () => ({
		playerScorecard: [],
		scoreList: [],
		courseScorecard: {},
		userScore: {},
		userScorecards: [],
		teamCard: [],
		teamCardOne: [],
		teamCardTwo: [],
		teamCardThree: [],
		teamCardFour: []
	}),
	actions: {
		loadScorecard(tournId, scorecardId) {
			const options = {
				tournament_id: tournId,
				scorecard_id: scorecardId
			}

			return axios.get(
				'/api/v2/rounds/scorecards.json', { params: options }
			).then((response) => {
				const list = response.data
				const player      = JSON.parse(list.player_card)
				const player_data = Object.keys(player).length === 0 ? {} : player.data.attributes

			  this.playerScorecard = player_data
			}, (err) => {
				console.log(err)
			})
		},
		// LOAD_TEAM_SCORECARD: function ({ commit, _ }, { tournId, team_id }) {
		// 	let options = {
		// 		tournament_id: tournId
		// 	}

		// 	return axios.get(
		// 		'/api/v2/rounds/team_scorecards/' + team_id + '.json',
		// 		{ params: options}
		// 	).then((response) => {
		// 		commit('SET_TEAM_SCORECARD', { list: response.data })
		// 	}, (err) => {
		// 		console.log(err)
		// 	})
		// },
		// LOAD_USER_SCORES: function ({ commit, _ }, { scorecardId }) {
		// 	axios.get('/scorecards/' + scorecardId + '/user_scores.json').then((response) => {
		// 		commit('SET_SCORE_LIST', { list: response.data })
		// 	}, (err) => {
		// 		console.log('set score', err)
		// 	})
		// },
		// LOAD_USER_SCORE: function ({ commit, _ }, { scorecard_id, score_id }) {
		// 	axios.get('/scorecards/' + scorecard_id + '/user_scores/' + score_id + '.json').then((response) => {
		// 		commit('SET_SCORE', { list: response.data })
		// 	}, (err) => {
		// 		console.log('set score', err)
		// 	})
		// },
		// CREATE_USER_SCORE: function ({ commit, _ }, { scorecardId, scores }) {
		// 	let options = { scorecard_id: scorecardId, user_score: scores}
		// 	return axios.post('/api/v2/user_scores.json', options)
		// 		.then((response) => {
		// 			if (response.status == 200) {
		// 				commit('SET_SCORECARD', { list: response.data })
		// 				return true
		// 			} else {
		// 				return false
		// 			}
		// 		}, (err) => {
		// 			console.log('send score error', err)
		// 	})
		// },
		// UPDATE_USER_SCORE: function ({ commit, _ }, { scorecardId, scoreId, scores }) {
		// 	let options = { scorecard_id: scorecardId, user_score_id: scoreId, user_score: scores }
		// 	return axios.put('/api/v2/user_scores/' + scoreId + '.json', options).then((response) => {
		// 		if (response.status === 200) {
		// 			commit('SET_SCORECARD', { list: response.data })
		// 			return true
		// 		} else {
		// 			return false
		// 		}
		// 	}, (err) => {
		// 		console.log('send score error', err)
		// 		return false
		// 	})
		// },
		// FINISH_SCORECARD: function({ commit, state }, { tournId, scorecardId, opts }) {
		// 	let options = { tournament_id: tournId, scorecard: { finished: opts } }
		// 	return axios.put('/api/v2/rounds/scorecards/' + scorecardId + '.json', options)
		// 		.then((response) => {
		// 			if (response.status === 200) {
		// 				return true
		// 			} else {
		// 				return false
		// 			}
		// 		})
		// },
	},
	persist: true
});
