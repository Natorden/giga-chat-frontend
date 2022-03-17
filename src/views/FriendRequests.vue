<template>
  <div class="container" style="width: 40em">
    <b-list-group v-for="(request, index) in requestsList" v-bind:key="index">
      <b-list-group-item>
        <sub style="font-size: 1.3em; margin-right: 17em">{{ request.username }}</sub>
        <b-button variant="success" style="margin-right: 0.3em">Accept</b-button>
        <b-button variant="danger">Decline</b-button>
      </b-list-group-item>
    </b-list-group>
    <h4 v-show="requestsList.length === 0"
        style="text-align: center">
      You have no current friend requests
    </h4>
  </div>
</template>

<script setup lang="ts">
import {UserStore} from "@/stores/user.store";

const userStore = UserStore();
const requestsList = userStore.requests;

</script>

<style scoped>

</style>