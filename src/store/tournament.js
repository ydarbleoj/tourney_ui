// stores/tournament.js
import { defineStore } from "pinia"
import axios from "axios";

export const useTournamentStore = defineStore("tournament", {
  state: () => ({
		tournaments: [],
		currentTournament: [],
		currentRoundInfo: [],
		tournamentBreakdown: [],
		tournamentRecords: [],
		tournamentRecord: {},
		courseInfo: [],
		courseBreakdown: [],
		mudderCupPreview: {},
		renderHandicap: true
	}),
	actions: {
		async loadTournamentList () {
      try {
				const res = await axios.get("/api/v2/tournaments.json")

				if (res.status === 200) {
					const data = res.data
					const tournaments = data.tournament
					console.log('hello', data)

					let tourn = JSON.parse(data.tournament).data.pop()

					this.renderHandicap = data.handicap
					this.currentTournament = tourn.attributes
					this.currentRoundInfo = tourn.attributes.round_info
					this.tournaments = JSON.parse(tournaments).data
					true
				} else {
					return false
				}
			} catch (err) {
				console.log(err)
				false
			}
		},
		loadTournament(id) {
			const options = { tournament_id: id }

			return axios.get("/api/v3/tournaments/" + id + ".json", { params: options }).then((response) => {
				this.currentTournament = response.data
				this.currentRoundInfo = response.data.round_info

				const cup = response.data.mudder_cup
				if (cup) {
					console.log("this cup", cup)
					this.mudderCupPreview = cup
				}
			}, (err) => {
				console.log("Tournament load error")
			})
		},
		loadTournamentRecords() {
			return axios.get("/api/v3/tournament_records").then((response) => {
				this.tournamentRecords = response.data
			}, (err) => {
				console.log("Tournament records load error")
			})
		},
		loadTournamentRecord(id) {
			return axios.get("/api/v3/tournament_records/" + id).then((response) => {
				this.tournamentRecord = response.data
			}, (err) => {
				console.log("Tournament record load error")
			})
		},
		loadCourse(id, roundId) {
			return axios.get(`/api/v3/tournaments/${id}/round/${roundId}.json`).then((response) => {
				this.courseInfo = response.data
			}, (err) => {
				console.log(err)
			})
		},
		loadTournamentBreakdown(id) {
			return axios.get(`/api/v3/tournaments/${id}/breakdowns.json`).then((response) => {
				this.tournamentBreakdown = response.data
			}, (err) => {
				console.log(err)
			})
		},
		loadCourseBreakdown(id, roundId) {
			return axios.get(`/api/v3/tournaments/${id}/breakdowns/${roundId}.json`).then((response) => {
				this.courseBreakdown = response.data
			}, (err) => {
				console.log(err)
			})
		}

	},
	persist: true,
})
