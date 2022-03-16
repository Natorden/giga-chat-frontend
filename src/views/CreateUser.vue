<template>
  <div class="container justify-content-center" style="width: 35em">
    <b-card bg-variant="light">
      <h2 style="text-align: center; margin-bottom: 1.5em">Register</h2>
      <div
        class="container justify-content-center"
        style="width: 25em; margin-bottom: 4em"
      >
        <b-form-input
          size="md"
          v-model="inputName"
          placeholder="Enter your username"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          type="email"
          v-model="inputEmail"
          placeholder="Enter your email"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          type="password"
          v-model="inputPassword"
          placeholder="Enter your password"
        >
        </b-form-input>
      </div>
      <b-button
        class="container justify-content-center"
        block
        variant="success"
        @click="handleCreateUser"
        >Register</b-button
      >
    </b-card>
  </div>
  <!--  <h2>Lets create a user</h2>
  <input v-model="inputName" placeholder="Enter Name" /> <br />
  <input v-model="inputEmail" placeholder="Enter Email" /> <br />
  <input v-model="inputPassword" placeholder="Enter Password" /> <br />
  <button @click="handleCreateUser">Create User</button>-->
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import { ref } from "vue";
import router from "@/router";

const userStore = UserStore();
const inputName = ref("");
const inputEmail = ref("");
const inputPassword = ref("");

function handleCreateUser() {
  if (
    inputName.value.length > 0 &&
    inputEmail.value.length > 0 &&
    inputPassword.value.length > 0
  ) {
    userStore.createUser(
      inputName.value,
      inputEmail.value,
      inputPassword.value
    );
    router.push({ path: "/loginView" });
  }
}
</script>

<style scoped></style>
