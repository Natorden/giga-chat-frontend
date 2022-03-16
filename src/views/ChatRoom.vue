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
              <li v-for="room in chatStore.rooms">{{ room.name }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <div class="messages">
              <ul>
                <li>John: Message 1</li>
                <li>John: Message 2</li>
              </ul>
            </div>
            <div style="display: flex" class="mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter a message..."
              />
              <button type="button" class="btn btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chat.store";

const chatStore = ChatStore();
chatStore.loadRooms();
</script>

<style scoped></style>
