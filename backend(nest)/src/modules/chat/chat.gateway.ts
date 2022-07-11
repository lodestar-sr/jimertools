import { UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from '@modules/chat/auth.guard';
import { ChatService } from "./chat.service";
import { SocketEventDto } from '@modules/chat/dto/socket-event.dto';
import { SendSmsDto } from '@modules/chat/dto/send-sms.dto';
import { sanitizeMessage } from '@shared/helpers/common.helper';
import { ChatroomService } from '@shared/services/chatroom.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  constructor(
    private chatService: ChatService,
    private chatroomService: ChatroomService,
  ) {
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('join')
  join(
    @MessageBody() data: SocketEventDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = data.user;
    client.join(user.chatroom.id);

    const messages = this.chatroomService.getMessages(user.chatroom)
      .map((item) => sanitizeMessage(item));

    client.emit("chat-history", messages);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('leave')
  leave(
    @MessageBody() data: SocketEventDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = data.user;
    client.leave(user.chatroom.id);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('send-sms')
  sendSms(
    @MessageBody() data: SendSmsDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = data.user;
    const message = this.chatService.createMessage(user, data);

    this.server.to(user.chatroom.id).emit('receive-sms', message);
  }
}
