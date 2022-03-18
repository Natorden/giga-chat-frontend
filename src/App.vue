<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-md">
    <img
      src="../src/assets/Gigachad.png"
      width="50"
      height="50"
      alt="logo"
      style="margin-left: 1em"
    />
    <span
      class="navbar-brand"
      href="#"
      style="margin-left: 1em; font-size: 1.5em; color: #ebb965"
      >GIGACHAT</span
    >
    <!--    Reactive drop down menu, not working atm-->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar-list-6"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" style="margin-left: 1em">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <RouterLink to="/" id="navbarItem">Home</RouterLink>
        </li>
        <li class="nav-item active" v-show="isLoggedIn.call()">
          <RouterLink to="/users" id="navbarItem">Users</RouterLink>
        </li>
        <li class="nav-item active" v-show="isLoggedIn.call()">
          <RouterLink to="/Chat" id="navbarItem">Chat</RouterLink>
        </li>
      </ul>
    </div>
    <div class="collapse navbar-collapse justify-content-end">
      <ul class="navbar-nav">
        <li class="nav-item active" v-show="isLoggedIn.call()">
          <RouterLink to="/friends" id="navbarItem">Friends</RouterLink>
        </li>
        <li class="nav-item active" v-show="isLoggedIn.call()">
          <RouterLink to="/requests" id="navbarItem">Requests <b-badge variant="success" style="font-size: 0.7em">{{requestAmount}}</b-badge></RouterLink>
        </li>
        <li class="nav-item active" v-show="!isLoggedIn.call()">
          <RouterLink to="/createUser" id="navbarItem">Register</RouterLink>
        </li>
        <span v-show="isLoggedIn.call()" id="username">{{ userStore.userName }}</span>
        <li class="nav-item active" v-show="isLoggedIn.call()">
          <RouterLink to="" @click="logout" id="navbarItem">Log Out</RouterLink>
        </li>
        <li class="nav-item active" v-show="!isLoggedIn.call()">
          <RouterLink
            to="/loginView"
            v-show="!isLoggedIn.call()"
            id="navbarItem"
            >Log In</RouterLink
          >
        </li>
      </ul>
    </div>
  </nav>
  <br />
  <RouterView />

  <div v-show="showNotif" id="toast-notification" class="p-3 w-full max-w-xs text-gray-900 bg-gray-700 rounded-lg shadow dark:bg-gray-800 dark:text-gray-300 dark:bg-gray-800 absolute bottom-5 right-5" role="alert">
    <div class="flex items-center mb-3">
      <span class="mb-1 text-sm font-semibold text-white dark:text-white">New notification</span>
      <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-gray-700 text-gray-400 hover:text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-600 inline-flex h-8 w-8 " data-collapse-toggle="toast-notification" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
      <div class="ml-3 text-sm font-normal">
        <h4 class="text-sm font-semibold text-white">{{ requestName }}</h4>
        <div class="text-sm font-normal text-white">Added you as a friend!</div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import {io} from "socket.io-client";
import {onBeforeUnmount, onMounted, onUpdated, ref} from "vue";
import type {User} from "@/models/User";
import {RequestService} from "@/services/request.service";
import router from "@/router";
import {UserService} from "@/services/user.service";

const requestService: RequestService = new RequestService();
const userService: UserService = new UserService();

let socket = io("localhost:3001");
socket.connect();

const userStore = UserStore();
let requestAmount = ref(0);

let showNotif = ref(false);
let requestName = ref('');

function isLoggedIn(): boolean {
  sender.value = JSON.parse(<string>localStorage.getItem("user")) as User;
  return !!localStorage.getItem("user");
}

function logout() {
  localStorage.removeItem("user");
  userStore.logout();
}

let sender = ref({} as User);

onUpdated(() => {
  if(sender.value != null) {

    socket.on(sender.value.uuid, from => {
      userService.getUserById(from).then((usr) => {
        requestName.value = usr.username;
      });

      userStore.addRequest(from);
      requestAmount.value++;
      showNotif.value = true
      setTimeout(() => {
        showNotif.value = false
      }, 3000);
    });

    // Find requests for the logged in user
    requestService.getRequestsByUserId(sender.value.uuid).then((r) => {
      requestAmount.value = r.length;
      r.forEach(req => {
        // Add them to the requests store
        userStore.addRequest(req.senderUserId);
      });
    });

    userStore.getAllFriends(sender.value);
    userStore.getAllUsers();
  }
});

</script>

<style>
#navbarItem {
  margin-right: 1em;
  text-decoration: none;
  color: ghostwhite;
  font-size: 1.2em;
}

#username {
  margin-right: 1.5em;
  text-decoration: none;
  color: navajowhite;
  font-size: 1.2em;
}
</style>
