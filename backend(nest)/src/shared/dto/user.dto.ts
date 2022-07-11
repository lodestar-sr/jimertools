import { ApiProperty } from "@nestjs/swagger";
import { ChatroomDto } from "@shared/dto/chatroom.dto";

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  chatroom: ChatroomDto;
}
