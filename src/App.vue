<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";

const { userName } = storeToRefs(UserStore());

function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}

function logout() {
  localStorage.removeItem("user");
}
</script>
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/createUser">Create User</RouterLink> |
    <RouterLink to="" @click="logout.call()" v-if="isLoggedIn.call()">Log Out</RouterLink>
    <RouterLink v-else to="/loginView">Log In</RouterLink> |
    <!--    <RouterLink to="/roomCreate">Create Room</RouterLink> |-->
    <!--    <RouterLink to="/chatView">View Chats</RouterLink> |-->
    <span>{{userName}}</span>
  </nav>
  <br />
  <RouterView />
</template>
