import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { ManagePetModule } from './manage-pet/manage-pet.module';
import { ManageStoreModule } from './manage-store/manage-store.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://phuctran125:WdVjwtzAaH5d015S@cluster0.rzaddwg.mongodb.net/petStore?retryWrites=true&w=majority'
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    UsersModule,
    ManagePetModule,
    ManageStoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
