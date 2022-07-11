import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "@shared/constants/global.constants";
import { TOKEN_EXPIRED, TOKEN_INVALID } from "@shared/constants/strings.constants";
import { UserDto } from "@shared/dto/user.dto";

@Injectable()
export class TokenService {

  generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET);
  }

  generateAuhToken(user: UserDto): string {
    return this.generateToken({
      id: user.id,
    });
  }

  verifyToken(token: string) {
    try {
      const payload: any = jwt.verify(token, JWT_SECRET);
      return {
        error: null,
        payload,
      };
    } catch (e) {
      return {
        error: e,
        message: e.message.includes('expire') ? TOKEN_EXPIRED : TOKEN_INVALID,
      };
    }
  }
}
