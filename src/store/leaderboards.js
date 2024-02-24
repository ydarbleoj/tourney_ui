// stores/leaderboards.js
import { defineStore } from "pinia";
import axios from "axios";

const keys = ((object) => {
  return Object.keys(object).length == 0 ? [] : object.data
})

export const useLeaderboardsStore = defineStore('leaderboards', {
	state: () => ({
		isLoaded: true,
		currentRound: 1,
		strokePreview: [],
		puttingPreview: [],
		skinsPreview: [],
		teamPreview: [],
		strokeLeaderboard: [],
		puttingLeaderboard: [],
		courseInfo:[],
		scorecardPreviews: [],
		skinsLeaderboard: [],
		strokePlayer: {},
		skinsPlayer: {},
		puttingPurse: 0,
		moneyPreview: [],
		moneyList: [],
		moneyPlayer: {},
		moneyBreakdown: [],
	}),
	actions: {
		loadPreviewLeaderboards(id) {
			let options = { tournament_id: id }

			return axios.get(
				'/api/v3/leaderboards/previews.json',
				{ params: options }
			).then((res) => {
				const list = res.data
				const strokes = JSON.parse(list.stroke)
				const putting = JSON.parse(list.putting)
				const skins = JSON.parse(list.skins)
				const team = JSON.parse(list.team)
				const money = JSON.parse(list.money)

				this.strokePreview = keys(strokes)
				this.puttingPreview = keys(putting)
				this.skinsPreview = keys(skins)
				this.teamPreview = keys(team)
				this.moneyPreview = keys(money)
				console.log("this money", list.rounds)
				this.moneyBreakdown = list.money_breakdown
				this.courseInfo = list.rounds
				true
			}, (err) =>{
				false
				console.log('error preview leaderboard', err)
			})
		},
		loadStrokeLeaderboard(id) {
			let options = { tournament_id: id }

			return axios.get(
				'/api/v3/leaderboards/strokes.json', { params: options }
			).then((response) => {
				const list = response.data
				this.strokeLeaderboard = list.data
			}, (err) => {
				console.log(err)
			})
		},
		loadStrokePlayer(tournId, id) {
			let options = { tournament_id: tournId }

			return axios.get(
				`/api/v3/leaderboards/strokes/${id}.json`, { params: options }
			).then((response) => {
				const list = response.data
				this.strokePlayer = list.data.attributes
			})
		},
		resetStrokePlayer() {
			this.isLoaded = false
			this.strokePlayer = {}
		},
		loadPuttingLeaderboard(id) {
			let options = { tournament_id: id }

			return axios.get(
				'/api/v3/leaderboards/putting.json', { params: options }
			).then((response) => {
				const list = response.data
				const reducer = (acc, currentValue) => acc + currentValue;
				const threePutts = list.data.map(el => el.attributes.total_3_putts)
				const total = (threePutts.length == 0) ? 0 : threePutts.reduce(reducer)

				this.puttingPurse = total
				this.puttingLeaderboard = response.data.data
			}, (err) => {
				console.log(err)
			})
		},
		loadPuttingPlayer(tournId, id) {
			let options = { tournament_id: tournId }

			return axios.get(
				`/api/v3/leaderboards/putting/${id}.json`, { params: options }
			).then((response) => {
				const list = response.data
				this.puttingPlayer = list.data.attributes
			})
		},
		loadSkins(id) {
			let options = { tournament_id: id }

			return axios.get(
				'/api/v3/leaderboards/skins.json', { params: options }
			).then((response) => {
				console.log(response)
				this.skinsLeaderboard = response.data.data
			}, (err) => {
				console.log(err)
			})
		},
		loadSkinsPlayer(tournId, id) {
			let options = { tournament_id: tournId }

			return axios.get(
				`/api/v3/leaderboards/skins/${id}.json`, { params: options }
			).then((response) => {
				const list = response.data
				this.skinsPlayer = list.data.attributes
			})
		},
		loadMoney(id) {
			let options = { tournament_id: id }

			return axios.get(
				'/api/v3/leaderboards/money_lists.json', { params: options }
			).then((response) => {
				this.moneyList = response.data.data
			}, (err) => {
				console.log(err)
			})
		},
		loadMoneyPlayer(tournId, id) {
			let options = { tournament_id: tournId }

			return axios.get(
				`/api/v3/leaderboards/money_lists/${id}.json`, { params: options }
			).then((response) => {
				const list = response.data
				this.moneyPlayer = list.data.attributes
			})
		},
		loadRounds(id) {
      let options = { tournament_id: id }

      return axios.get('/api/v2/rounds/lists.json', { params: options }).then((response) => {
        if (response.status === 200) {
          console.log('first', response.data)
					const rnds = response.data.rounds
					const crntRound = response.data.scorecard_previews

					this.currentRound = JSON.parse(rnds).data[0]
					this.rounds = JSON.parse(rnds).data
					this.scorecardPreviews = JSON.parse(crntRound).data
        }
      }, (err) => {
        console.log('error in rounds', err)
      })
    },
	},
	persist: true,
});
