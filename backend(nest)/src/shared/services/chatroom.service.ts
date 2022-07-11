import { Injectable } from "@nestjs/common";
import { ChatroomDto } from "@shared/dto/chatroom.dto";
import { generateUuid } from "@shared/helpers/common.helper";
import { StorageService } from "@shared/services/storage.service";

@Injectable()
export class ChatroomService {

  constructor(
    private storageService: StorageService,
  ) {
  }

  find(id: string) {
    return this.storageService.getChatrooms()
      .find((item) => item.id === id);
  }

  findOrCreate(name: string) {
    let chatroom = this.storageService.getChatrooms()
      .find((item) => item.name === name);

    if (!chatroom) {
      chatroom = {
        id: generateUuid(),
        name,
      };
      this.storageService.addChatroom(chatroom);
    }

    return chatroom;
  }

  getUsers(chatroom: ChatroomDto) {
    return this.storageService.getUsers()
      .filter((item) => item.chatroom === chatroom);
  }

  getMessages(chatroom: ChatroomDto) {
    return this.storageService.getMessages()
      .filter((item) => item.chatroom === chatroom);
  }
}
