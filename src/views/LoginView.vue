<template>
  <div class="container justify-content-center" style="width: 35em">
    <b-card bg-variant="light">
      <h2 style="text-align: center; margin-bottom: 1.5em">LOG IN</h2>
      <div
          class="container justify-content-center"
          style="width: 25em; margin-bottom: 4em"
      >
        <b-form-input
            size="md"
            v-model="usernameInput"
            placeholder="Enter your username"
            style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
            size="md"
            type="password"
            v-model="passwordInput"
            placeholder="Enter your password"
        >
        </b-form-input>
        <span
        >If you have no account, you can register
          <router-link to="/createUser">here</router-link></span
        >
      </div>
      <b-button
          class="container justify-content-center"
          block
          variant="success"
          @click="logIn"
      >Log in
      </b-button
      >
    </b-card>
  </div>
</template>

<script setup lang="ts">
import {UserStore} from "@/stores/user.store";
import router from "@/router";
import {ref} from "vue";

const userStore = UserStore();
const usernameInput = ref("");
const passwordInput = ref("");

function logIn() {
  if (usernameInput.value.length > 0 && passwordInput.value.length > 0) {
    if (userStore.logInUser(usernameInput.value, passwordInput.value)) {
      router.push({path: '/users'},)
      userStore.getAllUsers();
    }
  }

  return;
}
</script>

<style scoped></style>
