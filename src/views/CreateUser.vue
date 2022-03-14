<template>
  <h2>Lets create a user</h2>
  <input v-model="inputName" placeholder="Enter Name" /> <br />
  <input v-model="inputEmail" placeholder="Enter Email" /> <br />
  <input v-model="inputPassword" placeholder="Enter Password" /> <br />
  <button @click="handleCreateUser">Create User</button>
</template>

<script setup lang="ts">
import { UserStore } from "../stores/user.store";
import { ref } from "vue";

const userStore = UserStore();
const inputName = ref("");
const inputEmail = ref("");
const inputPassword = ref("");

function handleCreateUser() {
  if (inputName.value.length > 0 && inputEmail.value.length > 0 && inputPassword.value.length > 0) {
    userStore.createUser(inputName.value, inputEmail.value, inputPassword.value);
  }
}
</script>

<style scoped></style>
