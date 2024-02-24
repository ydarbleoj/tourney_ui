import { defineStore } from "pinia";
import axios from "axios";

export const useMudderCupStore = defineStore('mudderCup', {
  state: () => ({
    players: [],
    choosingOver: false,
    matches: [],
    cupTeam: [],
    teamTab: "one"
  }),
  actions: {
    async loadPlayers(id) {
      const options = { tournament_id: id }

      try {
        const response = await axios.get("/api/v3/mudder_cup/players.json", { params: options });
        const resData = response.data;

        console.log('Loading players', resData)
        if (resData.choosing_happen) {
          this.matches = resData;
          this.choosingOver = true;
        } else {
          this.players = resData;
        }
      } catch (error) {
        console.error('Error loading players:', error);
      }
    },
    async loadCupTeam(id, captainId) {
      const options = { tournament_id: id, captain_id: captainId}

      try {
        const response = await axios.get(`/api/v3/mudder_cup/teams/${captainId}.json`, { params: options });
        console.log('Loading cup team', response.data);
        this.cupTeam = response.data;
      } catch (error) {
        console.error('Error loading cup team:', error);
      }
    },
    async addPlayerToTeam(tournamentId, captainId, playerId) {
      const options = { tournament_id: tournamentId, captain_id: captainId, player_id: playerId }
      try {
        const response = await axios.post("/api/v3/mudder_cup/players.json", options);
        console.log('Adding player to team', response.data);
        this.players = response.data;
      } catch (error) {
        console.error('Error adding player to team:', error);
      }
    },
    async updateTeamName(tournamentId, captainId, teamName) {
      const options = { tournament_id: tournamentId, captain_id: captainId, team_name: teamName }
      console.log('options', options);
      try {
        const response = await axios.put(`/api/v3/mudder_cup/teams/${captainId}.json`, options);
        console.log('Updating team name', response.data);
        this.cupTeam = response.data;
      } catch (error) {
        console.error('Error updating team name:', error);
      }
    },
    async updateMatch(tournamentId, roundId, teamId, playerIds) {
      const options = { tournament_id: tournamentId, round_id: roundId, team_id: teamId, player_ids: playerIds }
      try {
        const response = await axios.put(`/api/v3/mudder_cup/matches/${teamId}.json`, options);
        console.log('Adding players to team', response.data);
        this.cupTeam = response.data;
      } catch (error) {
        console.error('Error adding players to team:', error);
      }
    },
    async resetMatch(tournamentId, roundId, teamId) {
      const options = { tournament_id: tournamentId, round_id: roundId, team_id: teamId }
      try {
        const response = await axios.delete(`/api/v3/mudder_cup/matches/${teamId}.json`, { params: options });
        console.log('Resetting match', response.data);
        this.cupTeam = response.data;
      } catch (error) {
        console.error('Error resetting match:', error);
      }
    },
    updateTeamTab(tab) {
      this.teamTab = tab;
    },
  },
  persist: true,
})
