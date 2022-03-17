<template>
  <div class="container" style="margin: 2em auto; width: 50em; padding: 0.5em">
    <div class="input-group mb-3">
      <input
        style="font-size: 1.5em"
        id="search"
        class="form-control"
        placeholder="Search for a user"
        aria-label="Write the name of user you want to find"
        aria-describedby="basic-addon2"
        v-model="userFilter"
        @keyup="shownUserList = filterUserList(userFilter)"
      />
    </div>

    <b-list-group v-for="(user, index) in shownUserList" v-bind:key="index">
      <b-list-group-item class="justify-content-center">
        <b-container>
          <b-row>
            <b-col cols="10"><span style="font-size: 1.5em">{{ user.username }}</span></b-col>
            <b-col cols="2"><b-button variant="success" @click="addFriend(user.uuid)" v-if="user.uuid !== sender.uuid">Add</b-button></b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>

    <h4
      v-show="userList.length === 0 || shownUserList.length === 0"
      style="text-align: center"
    >
      There are no users to show
    </h4>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import type { User } from "@/models/User";
import {onBeforeUpdate, onMounted, onUpdated, ref} from "vue";
import {RequestService} from "@/services/request.service";

const requestService: RequestService = new RequestService();

const userStore = UserStore();

let userList = [] as User[];
const shownUserList = ref([] as User[]);
const userFilter = ref("");

function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}

// Set local user list
userStore.users.forEach((user) => {
  userList.push(user);
});

// Set the user list that is displayed
shownUserList.value = userList;

function filterUserList(input: string) {
  const results = userList.filter((user) => user.username.includes(input));

  if (input.length === 0) {
    return userList;
  }

  return results;
}

let sender: User;

if (isLoggedIn()) {
  sender = JSON.parse(<string>localStorage.getItem('user'));
}

function addFriend(friendId: string) {
  if (isLoggedIn())
    requestService.sendRequest(sender.uuid, friendId);
}

userStore.getAllUsers();

</script>