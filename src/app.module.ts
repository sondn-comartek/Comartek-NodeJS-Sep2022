import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './app.crone';
import { DisCountSchema } from './schemas/discount.schema';
@Module({
  imports: [ClientModule,
    MongooseModule.forRoot('mongodb://localhost/learn_nest'), AuthModule,
    UsersModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      {name: "discount", schema: DisCountSchema}
    ])
    ],
  controllers: [AppController],
  providers: [AppService, TasksService],
  
})
export class AppModule {}
