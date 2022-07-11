import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./auth.jwt.strategy";
import { JWT_SECRET } from "@shared/constants/global.constants";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
