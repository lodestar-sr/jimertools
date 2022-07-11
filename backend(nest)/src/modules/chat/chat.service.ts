import { Injectable } from "@nestjs/common";
import { SendSmsDto } from "@modules/chat/dto/send-sms.dto";
import { UserDto } from "@shared/dto/user.dto";
import { MessageService } from "@shared/services/message.service";
import { sanitizeMessage } from "@shared/helpers/common.helper";

@Injectable()
export class ChatService {
  constructor (
    private messageService: MessageService,
  ) {}

  createMessage(user: UserDto, data: SendSmsDto) {
    const message = this.messageService.create(user, data.message);
    return sanitizeMessage(message);
  }
}
