import { Module } from "@nestjs/common";

import { ChatService } from "./chat.service";
import { AuthGuard } from '@modules/chat/auth.guard';
import { ChatGateway } from '@modules/chat/chat.gateway';
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [
    SharedModule,
  ],
  exports: [ChatService],
  providers: [AuthGuard, ChatService, ChatGateway],
})
export class ChatModule {}
