<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { UserStore } from "@/stores/user.store";

const userStore = UserStore();
</script>
<template>
  <nav>

    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/createUser">Create User</RouterLink> |
    <RouterLink to="/roomCreate">Create Room</RouterLink> |
    <!--    <RouterLink to="/chatView">View Chats</RouterLink> |-->
    <span>{{ userStore.userName }}</span>
  </nav>
  <br />
  <RouterView />
</template>
