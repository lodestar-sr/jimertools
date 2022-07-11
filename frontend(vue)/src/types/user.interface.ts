import { IChatroom } from "./chatroom.interface";
import { IMessage } from "./message.interface";

export interface IUser {
  id: string;
  name: string;
  chatroom: IChatroom;
  messages: IMessage[];
}
