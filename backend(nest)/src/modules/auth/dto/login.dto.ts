import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @ApiProperty()
  readonly chatroom: string;
}

export class LoginResponseDto {
  @IsString()
  @ApiProperty()
  readonly token: string;

  @IsString()
  @ApiProperty()
  readonly roomId: string;
}
