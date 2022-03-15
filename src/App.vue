<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";

const userStore = UserStore()
const { userName } = storeToRefs(UserStore());

function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}

function logout() {
  localStorage.removeItem("user");
  userStore.logout()
}

</script>
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/createUser">Create User</RouterLink> |
    <RouterLink to="/loginView" v-show="!isLoggedIn.call()">Log In</RouterLink> |
    <RouterLink to="/users" v-show="isLoggedIn.call()">Users</RouterLink> |
    <RouterLink to="" v-show="isLoggedIn.call()" @click="logout" >Log Out</RouterLink>
    <!--    <RouterLink to="/roomCreate">Create Room</RouterLink> |-->
    <!--    <RouterLink to="/chatView">View Chats</RouterLink> |-->
    <span v-show="isLoggedIn.call()"> | {{userName}}</span>
  </nav>
  <br />
  <RouterView />
</template>
