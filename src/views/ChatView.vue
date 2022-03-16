<template>
  <div class="center1">
    <h2>Chat Room</h2>
    <br />
  </div>

  <div class="center1 overflow-y-auto h-64 w-64...">
    <div v-for="(chat, index) in chatStore.chats" v-bind:key="index">
      {{ chat.text }}
    </div>
  </div>

  <div class="center1">
    <div>
      <input
        v-on:keyup.enter="onEnter"
        v-model="txtChatInput"
        placeholder="Enter message"
        id="myInput"
      />
      <br />
      <button
        @click="sendChat"
        onclick="document.getElementById('myInput').value = ''"
      >
        Send
      </button>
      |
      <button @click="leaveRoom">Exit Room</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chat.store";
import { ref } from "vue";
import router from "@/router";

const chatStore = ChatStore();
const txtChatInput = ref("");

function sendChat() {
  chatStore.createChat(txtChatInput.value);

  console.log(txtChatInput.value);
}
function leaveRoom() {
  router.push({ path: "/roomCreate" });
}
</script>

<style scoped></style>
