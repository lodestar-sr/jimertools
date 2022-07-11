import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { UserService } from '@shared/services/user.service';
import { TokenService } from '@shared/services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToWs();
    const data = request.getData();

    const tokenData = this.tokenService.verifyToken(data.token);
    if (tokenData.error) {
      throw new WsException('Unauthorized');
    }

    const userId = tokenData.payload.id;
    const user = this.userService.find(userId);
    if (!user || !user.chatroom) {
      throw new WsException('Unauthorized');
    }

    data.user = user;
    return true;
  }
}
