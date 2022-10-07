import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MigrationModule } from './migration.moule';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { MigrationService } from './migration.service';


async function bootstrap() {
  process.env.TYPE = 'migration'
  process.env.DB = `${process.argv[2]}/${process.argv[3]}`
  process.env.JWT_SECRET = "giangdv@comartek.com",
  process.env.EXPIRED_IN = "3 days",

  process.env.TYPE = "migration"
  console.log("ádasdasdasd")
  const database = process.argv[2]
  const databasename = process.argv[3]
  const migrationMethod = process.argv[4]
  const app = await NestFactory.create(MigrationModule);

  const migrationServise = await app.select(MigrationModule).get(MigrationService, {strict: true})
 
  migrationServise.run(migrationMethod)
}

bootstrap();
