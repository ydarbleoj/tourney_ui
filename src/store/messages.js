// stores/messages.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    groupedMessages: []
  }),
  actions: {
    async loadMessages(tournamentId) {
      try {
        const response = await axios.get(`/api/v3/tournaments/${tournamentId}/messages`);
        console.log('Loading messages for tournament', response.data);
        this.groupedMessages = response.data;
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    },
    addMessage(message) {
      console.log('Adding message:', this.groupedMessages);
      this.groupedMessages[0].messages.push(message);
    },
    updateMessage(message) {
      const group = this.groupedMessages.find((group) => group.date_label === message.date_label);
      if (!group) {
        console.error('Group not found');
        return;
      }

      const messageIndex = group.messages.findIndex((message) => message.id === message.id);
      if (messageIndex === -1) {
        console.error('Message not found');
        return;
      }

      group.messages[messageIndex] = message;

      this.groupedMessages = [...this.groupedMessages];
    }
  },
  persist: true,
})
