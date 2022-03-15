<script setup lang="ts">

import { UserStore } from "@/stores/user.store";
import type {User} from "@/models/User";

const userStore = UserStore();
userStore.getAllUsers()

let userList = [] as User[];

userStore.users.forEach((user) => {
  userList.push(user)
})

console.log(userList)

</script>

<template>

  <b-list-group v-for="(user, index) in userList" v-bind:key="index">
    <b-list-group-item>{{user.username}}</b-list-group-item>
  </b-list-group>

</template>
