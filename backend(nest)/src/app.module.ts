import { Module } from "@nestjs/common";
import { AppService } from "./app.service";

import { SharedModule } from "@shared/shared.module";
import { SwaggerService } from "@swagger/swagger.service";
import { AuthModule } from "@modules/auth/auth.module";
import { ChatModule } from "@modules/chat/chat.module";

@Module({
  imports: [
    SharedModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [AppService, SwaggerService],
})
export class AppModule {}
