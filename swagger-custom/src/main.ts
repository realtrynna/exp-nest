import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from "@nestjs/swagger";

import { AppModule } from './app.module';
import { SwaggerConfigBuilder } from "src/config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new SwaggerConfigBuilder().swaggerConfig();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("api", app, swaggerDocument);

  await app.listen(3000);
}
bootstrap();
