import { HttpService } from "./http.service";

export class AuthService {
  static login(username: string, chatroom: string) {
    return HttpService.post("/auth/login", { username, chatroom });
  }

  static getProfile() {
    return HttpService.get("/auth/me");
  }

  static logout() {
    return HttpService.post("/auth/logout");
  }
}
