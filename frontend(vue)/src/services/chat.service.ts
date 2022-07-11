import { Store } from "vuex";
import { connect, Socket } from "socket.io-client";
import { CONFIG } from "../constants";
import { IState } from "../store";

export enum CHAT_EVENT {
  JOIN = "join",
  LEAVE = "leave",
  SEND_SMS = "send-sms",
  RECEIVE_SMS = "receive-sms",
  CHAT_HISTORY = "chat-history"
}

export class ChatService {
  socket: Socket;
  store: Store<IState>;

  constructor(store: Store<IState>) {
    this.store = store;
    this.socket = connect(CONFIG.API_SERVER, { path: "" });

    this.socket.on("connect", () => {
      this.join();
    });

    this.socket.on("disconnect", () => {
      this.leave();
    });

    this.socket.on(CHAT_EVENT.CHAT_HISTORY, (data) => {
      this.store.dispatch("setMessages", data);
    });

    this.socket.on(CHAT_EVENT.RECEIVE_SMS, (data) => {
      this.store.dispatch("addMessage", data);
    });

    this.socket.on("exception", (err) => {
      if (err.message === "Unauthorized") {
        this.store.dispatch("logout");
      }
    });
  }

  emit(event: CHAT_EVENT, data: any = {}) {
    data.token = localStorage.getItem("token");
    return this.socket.emit(event, data);
  }

  join() {
    this.emit(CHAT_EVENT.JOIN);
  }

  leave() {
    this.emit(CHAT_EVENT.LEAVE);
  }

  sendSms(message: string) {
    this.emit(CHAT_EVENT.SEND_SMS, { message });
  }
}
