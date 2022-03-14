<template>
  <div>
    <div>
      <input v-model="usernameInput" placeholder="Enter Username" /> <br />
      <input v-model="passwordInput" placeholder="Enter Password" /> <br />
    </div>

    <div>
      <button @click="logIn">Log In</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import router from "@/router";
import { ref } from "vue";

const userStore = UserStore();
const usernameInput = ref("");
const passwordInput = ref("");

function logIn() {
  if (usernameInput.value.length > 0 && passwordInput.value.length > 0) {
    if (userStore.logInUser(usernameInput.value, passwordInput.value)) {
      router.push({ path: "/roomCreate" });
    }
  }

  return;
}
</script>

<style scoped></style>
