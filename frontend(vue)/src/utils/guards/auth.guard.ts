import { useStore } from "vuex";
import { ROUTES } from "../../constants";
import { AuthService } from "../../services/auth.service";

export const AuthGuard = () => {
  const store = useStore();
  const token = localStorage.getItem("token");
  store.dispatch("setToken", token);

  if (!token) {
    store.dispatch("setUser", null);
    return ROUTES.AUTH.LOGIN;
  }

  if (store.state.user) {
    return true;
  }

  return AuthService.getProfile()
    .then((data) => {
      store.dispatch("setUser", data);
      return true;
    })
    .catch(() => {
      store.dispatch("setUser", null);
      return ROUTES.AUTH.LOGIN;
    });
};
