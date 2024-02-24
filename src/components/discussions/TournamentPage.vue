<template>
  <v-container class="pa-0">
    <div class="header-container">
      <h2 class="bandon-orange-color pl-2 pb-2 pt-2">General</h2>
      <v-divider></v-divider>
    </div>

    <div class="messages-container">
      <div v-for="(group, index) in groupedMessages" :key="index">
        <div class="date-separator">
          <div class="date-label">{{ group.date_label }}</div>
        </div>
        <message-component
          v-for="message in group.messages"
          :key="message.id"
          :message="message"
          class="pl-2"
        ></message-component>
      </div>
    </div>

    <div class="fixed-bottom-container mt-2">
      <v-divider></v-divider>
      <MessageForm />
    </div>
  </v-container>
</template>

<script>
import MessageForm from "../discussions/MessageForm.vue";
import MessageComponent from "../discussions/PlayerMessage.vue";
import { useMessagesStore } from '@/store/messages';

export default {
  data() {
    return {
      localMessges: [],
    };
  },
  methods: {
    receivedMessage(data) {
      console.log('Received message:', data);
      useMessagesStore().addMessage(data.message)
    },
  },
  computed: {
    groupedMessages() {
      return useMessagesStore().groupedMessages;
    },
  },
  mounted() {
    const messagesStore = useMessagesStore();
    const tournamentId = this.$route.params.id;

    messagesStore.loadMessages(tournamentId)

    this.$cable.subscribe({
      channel: 'MessagesChannel',
      tournament_id: tournamentId
    }, {
      received: this.receivedMessage
    });
  },
  beforeDestroy() {
    this.$cable.unsubscribe('MessagesChannel');
  },
  components: { MessageComponent, MessageForm }
};
</script>
<style scoped>
.v-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height */
}

.messages-container {
  flex-grow: 1; /* Takes up all available space */
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto; /* Enable vertical scrolling */
  margin-bottom: 110px;
  margin-top: 50px;
}
.header-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: #f7f7f7;
}
.fixed-bottom-container {
  position: fixed;
  bottom: 56px;
  left: 0;
  right: 0;
  z-index: 110;
}
header.v-bottom-navigation {
  z-index: -1000;
}
.date-separator {
  position: relative;
  margin-bottom: 10px;
}

.date-separator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  border-top: 1px solid #ccc; /* Thin gray line */
  transform: translateY(-50%);
}

.date-label {
  position: absolute;
  background-color: #f7f7f7; /* Match the background of the parent container */
  border: 1px solid #ccc; /* Thin gray oval border */
  border-radius: 20px; /* Oval shape */
  padding: 0px 6px; /* Adjust padding as needed */
  display: inline-block; /* Allows for auto width based on content */
  transform: translateY(-50%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Ensures the label is above the line */
}
</style>
