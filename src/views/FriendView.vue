<template>
  <div class="container" style="width: 40em">
    <b-list-group v-for="(friend, index) in friendList" v-bind:key="index" ref="">
      <b-list-group-item class="justify-content-center">
        <b-container>
          <b-row>
            <b-col cols="10"><span style="font-size: 1.5em">{{ friend.username }}</span></b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>
  </div>
  <h4
      v-show="friendList.length === 0"
      style="text-align: center"
  >
    You are friendless :{
  </h4>
</template>

<script setup lang="ts">

import {UserStore} from "@/stores/user.store";
import type {User} from "@/models/User";
import {ref} from "vue";

const userStore = UserStore();
userStore.getAllFriends(JSON.parse(<string>localStorage.getItem("user")) as User);
const friendList = ref(userStore.friendsArray);

</script>

<style scoped>

</style>