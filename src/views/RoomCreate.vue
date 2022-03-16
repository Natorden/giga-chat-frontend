<template>
  <div class="center1">
    <h2>Create Room</h2>
    <div>
      <input v-model="txtRoomListener" placeholder="Enter room name" /> <br />
    </div>
    <!--    <router-link to="/chatView" tag="button" @click="listenToRoom">Connect</router-link>-->
    <div>
      <button @click="listenToRoom">Create Room</button> |
      <button @click="logOut">Sign Out</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chat.store";
import { ref } from "vue";
import router from "@/router";

const chatStore = ChatStore();

const txtRoomListener = ref("");

function listenToRoom() {
  chatStore.setRoom(txtRoomListener.value);
  router.push({ path: "/chatView" });
}
function logOut() {
  router.push({ path: "/loginView" });
}
</script>

<style scoped></style>
