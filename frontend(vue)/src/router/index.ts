import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ROUTES } from "../constants";
import Login from "../pages/Auth/Login.vue";
import Chatroom from "../pages/Chatroom/Chatroom.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: ROUTES.AUTH.LOGIN
  },
  {
    path: ROUTES.AUTH.LOGIN,
    name: "login",
    component: Login
  },
  {
    path: ROUTES.CHATROOM,
    name: "chatroom",
    component: Chatroom
  }
];

export const history = createWebHistory();

const router = createRouter({
  history,
  routes
});

export default router;
