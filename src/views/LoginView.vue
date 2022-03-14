<template>

<div>
  <div>
    <input v-model="usernameInput" placeholder="Enter Username"> <br>
    <input v-model="passwordInput" placeholder="Enter Password"> <br>
  </div>

  <div>
    <button @click="logIn">Log In</button>
  </div>

</div>

</template>

<script setup lang="ts">

import router from "@/router";
import { ref } from "vue";

const usernameInput = ref("");
const passwordInput = ref("");

function logIn(){

  router.push({path: "/roomCreate"});
}


</script>

<style scoped>

</style>