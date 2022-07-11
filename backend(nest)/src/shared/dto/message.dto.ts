import { ApiProperty } from "@nestjs/swagger";
import { ChatroomDto } from "@shared/dto/chatroom.dto";

export class MessageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sender: string;

  @ApiProperty()
  senderId: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  chatroom: ChatroomDto;

  @ApiProperty()
  createdAt: string;
}
