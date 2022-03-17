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
      </ul>
    </div>
    <div class="collapse navbar-collapse justify-content-end">
      <ul class="navbar-nav">
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
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import {io} from "socket.io-client";
import {ref} from "vue";
import type {User} from "@/models/User";
import {RequestService} from "@/services/request.service";

let socket = io("localhost:3001");
socket.connect();

const requestService: RequestService = new RequestService();

const userStore = UserStore();
let requestAmount = ref(0);

function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}

function logout() {
  localStorage.removeItem("user");
  userStore.logout();
}

let sender;

// When logged in
if (localStorage.getItem('user') != null) {
  sender = JSON.parse(<string>localStorage.getItem("user")) as User;

  requestService.getRequestsByUserId(sender.uuid).then((requests) => {
    requestAmount.value = requests.length;
    requests.forEach((request) => {
      userStore.requests.push(request);
      console.log(request);
    });
  });

  socket.on(sender.uuid, from => {
    userStore.addRequest(from);
    requestAmount.value++;
  });
}

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
