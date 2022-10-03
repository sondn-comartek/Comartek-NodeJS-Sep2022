import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
