<template>
  <h2>Create Room</h2>
  <input v-model="txtRoomListener" placeholder="Enter room name" /> <br />
  <router-link to="/chatView" tag="button" @click="listenToRoom">Connect</router-link>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chat.store";
import { ref } from "vue";

const chatStore = ChatStore();

const txtRoomListener = ref("");

function listenToRoom() {
  if (txtRoomListener.value != null)
  {
    chatStore.setRoom(txtRoomListener.value);
  }
  return;
  //router.push({ path: "/chatView" });
}
</script>

<style scoped></style>
