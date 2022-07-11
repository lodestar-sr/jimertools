import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT_SECRET } from "@shared/constants/global.constants";
import { UserDto } from "@shared/dto/user.dto";
import { JwtStrategyPayload } from "./dto/jwt-strategy-payload.dto";
import { UserService } from "@shared/services/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtStrategyPayload): Promise<UserDto> {
    const user = await this.userService.find(payload.id);
    if (!user || !user.chatroom) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
