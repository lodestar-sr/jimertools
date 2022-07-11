import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";
import { SocketEventDto } from '@modules/chat/dto/socket-event.dto';

export class SendSmsDto extends SocketEventDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  readonly message: string;
}
