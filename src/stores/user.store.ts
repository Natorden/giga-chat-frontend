import { defineStore } from "pinia";
import type { User } from "@/models/User";
import { UserService } from "@/services/user.service";

const userService: UserService = new UserService();

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: { username: "" } as User,
    users: [] as User[],
    requests: [] as User[],
  }),
  getters: {
    userName: (state) => {
      if (state.loggedInUser.username != undefined)
        return state.loggedInUser.username;
      else return "";
    },
    users: (state) => {
      if (state.users != undefined) return state.users;
      else return [] as User[];
    },
    requests: (state) => {
      if (state.requests != undefined) return state.requests;
      else return [] as User[];
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
    getAllUsers() {
      userService
        .getAllUsers()
        .then((users) => {
          // Add user one by one instead of this.users = users to prevent an exception
          this.users.forEach((user, index) => {
            delete this.users[index];
          });

          users.forEach((user) => {
            this.users.push(user);
          });
        })
        .catch((err) => console.log(err));
    },
    addRequest(userRequestingId: string) {
      // Get user object of the requesting user and add to request store
      userService.getUserById(userRequestingId).then(user =>{
        this.requests.push(user);
      })
    },
  },
});
