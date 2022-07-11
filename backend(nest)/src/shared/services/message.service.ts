import { Injectable } from "@nestjs/common";
import { UserDto } from "@shared/dto/user.dto";
import { ChatroomDto } from "@shared/dto/chatroom.dto";
import { MessageDto } from "@shared/dto/message.dto";
import { generateUuid } from "@shared/helpers/common.helper";
import { StorageService } from "@shared/services/storage.service";

@Injectable()
export class MessageService {

  constructor(
    private storageService: StorageService,
  ) {
  }

  create(user: UserDto, content: string) {
    const message: MessageDto = {
      id: generateUuid(),
      sender: user.name,
      senderId: user.id,
      content,
      chatroom: user.chatroom,
      createdAt: new Date().toISOString(),
    };
    this.storageService.addMessage(message);
    return message;
  }

  searchByChatroom(chatroom: ChatroomDto) {
    return this.storageService.getMessages()
      .filter((item) => item.chatroom === chatroom);
  }
}
