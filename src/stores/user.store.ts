import { defineStore } from "pinia";
import type { User } from "@/models/User";
import { UserService } from "@/services/user.service";
import router from "@/router";
import type { LoginDto } from "@/models/Login.dto";

const userService: UserService = new UserService();

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: { username: "" } as User,
    users: [] as User[],
    requests: [] as User[],
    friends: [] as User[],
  }),
  getters: {
    userName: (state) => {
      if (state.loggedInUser.username != undefined)
        return state.loggedInUser.username;
      else return "";
    },
    loggedIn: (state) => {
      if (state.loggedInUser != undefined) return state.loggedInUser;
      return {} as User;
    },
    users: (state) => {
      if (state.users != undefined) return state.users;
      else return [] as User[];
    },
    requests: (state) => {
      if (state.requests != undefined) return state.requests;
      else return [] as User[];
    },
    requestsAmount() {
      return this.requests.length;
    },
    friends: (state) => {
      if (state.friends != undefined) return state.friends;
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
      const login: LoginDto = {
        username: username,
        password: password,
      };
      userService
        .logIn(login)
        .then((user) => {
          if (user) {
            this.loggedInUser = user;
            const parsed = JSON.stringify(this.loggedInUser);
            localStorage.setItem("user", parsed);
            return true;
          }
          // TODO: add some kinda notification to let the user know the login failed
        })
        .catch((err) => console.log(err));
      return false;
    },
    logout() {
      this.loggedInUser = { username: "" } as User;
      localStorage.removeItem("user");
      router.replace({ path: "/loginView" });
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
      userService.getUserById(userRequestingId).then((user) => {
        this.requests.push(user);
      });
    },
    removeRequest(index: number) {
      this.requests.splice(index, 1);
    },
  },
});
