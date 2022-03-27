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
          v-model="inputGender"
          placeholder="Enter your gender"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input size="md" v-model="inputAge" placeholder="Enter your age">
        </b-form-input>
      </div>
      <b-button
        class="container justify-content-center"
        block
        variant="success"
        @click="handleCreateUser"
        >Register
      </b-button>
    </b-card>
  </div>
</template>

<script lang="ts">
import { MongoUserStore } from "@/stores/mongoUser.store";
import { ref } from "vue";
import router from "@/router";

const mongoUserStore = MongoUserStore();
const inputName = ref("");
const inputGender = ref("");
const inputAge = ref("");

function handleCreateUser() {
  if (
    inputName.value.length > 0 &&
    inputGender.value.length > 0 &&
    inputAge.value.length > 0
  ) {
    mongoUserStore.createMongoUser(inputName.value, inputGender.value, 25);
    router.push({ path: "/loginView" });
  }
}
</script>

<style scoped></style>
