<script setup lang="ts">

import { UserStore } from "@/stores/user.store";
import type {User} from "@/models/User";
import {ref} from "vue";

const userStore = UserStore();
userStore.getAllUsers()

let userList = [] as User[];
const shownUserList = ref([] as User[]);
const userFilter = ref('');

userStore.users.forEach((user) => {
  userList.push(user)
})

shownUserList.value = userList

function filterUserList(input: string) {
  const results = userList.filter(user => user.username.includes(input))

  if (input.length === 0) {
    return userList
  }
  return results
}

</script>

<template>

  <div class="container" style="margin: 2em auto; width: 50em; padding: 0.5em;">
    <div class="input-group mb-3" >
      <input style="font-size: 1.5em"
             id="search" class="form-control"
             placeholder="Search for a user"
             aria-label="Write the name of user you want to find"
             aria-describedby="basic-addon2"
                    v-model="userFilter"
       @keyup="shownUserList = filterUserList(userFilter)">

    </div>

    <b-list-group v-for="(user, index) in shownUserList" v-bind:key="index">
      <b-list-group-item>{{user.username}} </b-list-group-item>
    </b-list-group>

    <h4 v-show="userList.length === 0 || shownUserList.length === 0" style="text-align: center">There are no users to show</h4>
  </div>

</template>
