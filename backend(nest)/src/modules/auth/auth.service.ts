import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserDto } from "@shared/dto/user.dto";
import { UserService } from "@shared/services/user.service";
import { ChatroomService } from "@shared/services/chatroom.service";
import { TokenService } from "@shared/services/token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly chatroomService: ChatroomService,
    private readonly tokenService: TokenService,
  ) {

  }

  async login(loginDto: LoginDto) {
    let user = this.userService.findByName(loginDto.username);
    const chatroom = this.chatroomService.findOrCreate(loginDto.chatroom);
    if (!user) {
      user = this.userService.create(loginDto.username, chatroom);
    } else {
      this.userService.update(user, { chatroom });
    }

    return this.tokenService.generateAuhToken(user);
  }

  async logout(user: UserDto) {
    this.userService.update(user, { chatroom: null });
  }
}
