import { Injectable } from "@nestjs/common";
import { UserDto } from "@shared/dto/user.dto";
import { ChatroomDto } from "@shared/dto/chatroom.dto";
import { MessageDto } from "@shared/dto/message.dto";

@Injectable()
export class StorageService {

  private users: UserDto[] = [];
  private chatrooms: ChatroomDto[] = [];
  private messages: MessageDto[] = [];

  constructor() {
  }

  getUsers() {
    return this.users;
  }

  addUser(user: UserDto) {
    this.users.push(user);
    return user;
  }

  updateUser(user: UserDto, updates: Partial<UserDto>) {
    Object.assign(user, updates);
    return user;
  }

  deleteUser(user: UserDto) {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }

  getChatrooms() {
    return this.chatrooms;
  }

  addChatroom(chatroom: ChatroomDto) {
    this.chatrooms.push(chatroom);
    return chatroom;
  }

  getMessages() {
    return this.messages;
  }

  addMessage(message: MessageDto) {
    this.messages.push(message);
    return message;
  }
}
