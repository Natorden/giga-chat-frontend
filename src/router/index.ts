import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateUser from "../views/CreateUser.vue";
import ChatView from "../views/ChatView.vue";
import RoomCreate from "../views/RoomCreate.vue";
import LoginView from "../views/LoginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
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
  ],
});

export default router;
