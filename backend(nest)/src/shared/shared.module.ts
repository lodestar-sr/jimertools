import { Module } from "@nestjs/common";
import { StorageService } from "@shared/services/storage.service";
import { UserService } from "@shared/services/user.service";
import { ChatroomService } from "@shared/services/chatroom.service";
import { MessageService } from "@shared/services/message.service";
import { TokenService } from "@shared/services/token.service";

@Module({
  imports: [],
  exports: [
    StorageService,
    UserService,
    ChatroomService,
    MessageService,
    TokenService,
  ],
  providers: [
    StorageService,
    UserService,
    ChatroomService,
    MessageService,
    TokenService,
  ]
})
export class SharedModule {}
