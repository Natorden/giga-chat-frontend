import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateUser from "../views/CreateUser.vue";
import ChatView from "../views/ChatView.vue";
import RoomCreate from "../views/RoomCreate.vue";
import LoginView from "../views/LoginView.vue"
import UserList from "../views/UserList.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "any",
      component: HomeView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/createUser",
      name: "CreateUser",
      component: CreateUser,
    },
    {
      path: "/chatView",
      name: "ChatView",
      component: ChatView,
    },
    {
      path: "/roomCreate",
      name: "New Room",
      component: RoomCreate,
    },
    {
      path: "/loginView",
      name: "Log-In",
      component: LoginView,
    },
    {
      path: "/users",
      name: "Users",
      component: UserList,
    },
  ],
});

export default router;
