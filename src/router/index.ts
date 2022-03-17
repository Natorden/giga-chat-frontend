import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateUser from "../views/CreateUser.vue";
import LoginView from "../views/LoginView.vue";
import UserList from "../views/UserList.vue";
import FriendRequests from "../views/FriendRequests.vue";
import FriendView from "../views/FriendView.vue";
import ChatRoomView from "../views/ChatRoom.vue";

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
      path: "/loginView",
      name: "Log-In",
      component: LoginView,
    },
    {
      path: "/users",
      name: "Users",
      component: UserList,
    },
    {
      path: "/requests",
      name: "Requests",
      component: FriendRequests,
    },
    {
      path: "/friends",
      name: 'Friends',
      component: FriendView,
    },
      path: "/chat",
      name: "Chat",
      component: ChatRoomView,
    },
  ],
});

export default router;
