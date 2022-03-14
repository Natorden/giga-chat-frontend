import { defineStore } from "pinia";
import type { User } from "@/models/User";
import { UserService } from "@/services/user.service";

const userService: UserService = new UserService();

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: { username: "" } as User,
  }),
  getters: {
    userName: (state) => {
      if (state.loggedInUser.username != undefined) return state.loggedInUser.username;
      else return "";
    },
  },
  actions: {
    createUser(username: string, email: string, password: string) {
      userService
        .createUser(username, email, password)
        .then((user) => (this.loggedInUser = user))
        .catch((err) => console.log(err.message));
    },
    logInUser(username: string, password: string){
      userService
        .logIn(username,password)
        .then((user) => (this.loggedInUser = user))
    }
  },
});
