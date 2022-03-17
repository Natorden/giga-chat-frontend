<template>
  <div
    class="container"
    style="margin: 2em auto; width: 60em; padding: 0.5em; height: 60vh"
  >
    <div class="row h-100">
      <div class="col-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Chat Rooms</h5>
            <hr />
            <ul>
              <li
                class="room"
                v-for="room in chatStore.rooms"
                v-on:click="onRoomClicked(room.uuid)"
              >
                {{ room.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <div class="messages">
              <ul v-if="chatStore.selectedRoom != undefined">
                <li v-for="chat in chatStore.selectedRoom.chats">
                  {{ chat.user.username }}: {{ chat.text }}
                </li>
              </ul>
            </div>
            <div style="display: flex" class="mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter a message..."
                v-model="chatInput"
              />
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="sendMsg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chat.store";
import { ref } from "vue";

const chatStore = ChatStore();
chatStore.loadRooms();

const chatInput = ref("");

function onRoomClicked(roomUUID: string) {
  chatStore.selectRoom(roomUUID);
}

function sendMsg() {
  chatStore.createChat(chatInput.value);
}
</script>

<style scoped>
.room {
  cursor: pointer;
}

.selected {
  font-weight: bold;
}
</style>
