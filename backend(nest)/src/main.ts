import { NestFactory } from "@nestjs/core";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { SWAGGER_API_PATH } from "@swagger/swagger.constants";
import { SwaggerService } from "@swagger/swagger.service";
import { API_PREFIX } from "@shared/constants/global.constants";

import { AppModule } from "./app.module";
import { AppService } from "./app.service";

import * as dotenv from "dotenv";
dotenv.config();

async function setupSwagger(app: INestApplication) {
  const swagger = await app.resolve(SwaggerService);
  swagger.prepareSwaggerOptions();
  const document = SwaggerModule.createDocument(app, swagger.swaggerOptions.build());
  SwaggerModule.setup(SWAGGER_API_PATH, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(API_PREFIX);
  await setupSwagger(app);
  await app.listen(AppService.port());
}
bootstrap();
