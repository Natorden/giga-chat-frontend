<template>
  <div class="container" style="margin: 2em auto; width: 27em; padding: 0.5em">
    <b-list-group v-for="(request, index) in requestsList" v-bind:key="index">
      <b-list-group-item>
          <span style="font-size: 1.5em; margin-right: 7.3em">{{ request.username }}</span>
          <b-button variant="success" style="margin-right: 0.5em">Accept</b-button>
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
import {RequestService} from "@/services/request.service";


const userStore = UserStore();
let requestsList = userStore.requests;

// TODO: GET REQUESTS FROM BACKEND


</script>

<style scoped>

</style>