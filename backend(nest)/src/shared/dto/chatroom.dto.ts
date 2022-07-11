import { ApiProperty } from "@nestjs/swagger";

export class ChatroomDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
