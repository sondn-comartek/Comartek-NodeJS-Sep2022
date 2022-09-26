import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
    transform : true 
  }))
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
