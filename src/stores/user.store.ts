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
      if (state.loggedInUser.username != undefined)
        return state.loggedInUser.username;
      else return "";
    },
  },
  actions: {
    createUser(username: string, email: string, password: string) {
      userService
        .createUser(username, email, password)
        .catch((err) => console.log(err.message));
    },
    logInUser(username: string, password: string): boolean {
      userService
        .logIn(username, password)
        .then((user) => {
          if (user != null) {
            this.loggedInUser = user;
            const parsed = JSON.stringify(this.loggedInUser);
            localStorage.setItem("user", parsed);
            return true;
          }
        })
        .catch((err) => console.log(err));
      return false;
    },
    logout() {
      this.loggedInUser = { username: "" } as User;
      localStorage.removeItem("user");
    },
  },
});
