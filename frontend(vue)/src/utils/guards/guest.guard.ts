import { useStore } from "vuex";
import { ROUTES } from "../../constants";
import { AuthService } from "../../services/auth.service";

export const GuestGuard = () => {
  const store = useStore();
  const token = localStorage.getItem("token");
  store.dispatch("setToken", token);

  if (!token) {
    store.dispatch("setUser", null);
    return true;
  }

  if (store.state.user) {
    return ROUTES.CHATROOM;
  }

  return AuthService.getProfile()
    .then((data) => {
      store.dispatch("setUser", data);
      return ROUTES.CHATROOM;
    })
    .catch(() => {
      store.dispatch("setUser", null);
      return true;
    });
};
