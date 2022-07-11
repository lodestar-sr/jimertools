import { createStore } from "vuex";
import { ROUTES } from "../constants";
import router from "../router";
import { AuthService } from "../services/auth.service";
import { IMessage, IUser } from "../types";

export interface IState {
  token: string;
  user: IUser;
  messages: IMessage[];
}

export default createStore<IState>({
  state: {
    token: null,
    user: null,
    messages: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_MESSAGES(state, messages) {
      state.messages = messages;
    },
    ADD_MESSAGE(state, message) {
      state.messages = [...state.messages, message];
    }
  },
  actions: {
    setToken(context, token: string) {
      context.commit("SET_TOKEN", token);
      if (!token) {
        context.commit("SET_USER", null);
        return null;
      }
      return AuthService.getProfile()
        .then((data) => {
          context.commit("SET_USER", data);
          return data;
        })
        .catch(() => {
          context.commit("SET_USER", null);
          context.commit("SET_TOKEN", null);
          return null;
        });
    },
    setUser(context, user: IUser) {
      context.commit("SET_USER", user);
    },
    logout(context) {
      AuthService.logout().catch();
      context.commit("SET_USER", null);
      context.commit("SET_TOKEN", null);
      router.replace(ROUTES.AUTH.LOGIN);
    },
    setMessages(context, messages: IMessage[]) {
      context.commit("SET_MESSAGES", messages);
    },
    addMessage(context, message: IMessage) {
      context.commit("ADD_MESSAGE", message);
    }
  }
});
