import { PetSchema } from './../shared/schemas/pet.schema';
import { Pet } from 'src/shared/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TaskSchedulingService } from './task-scheduling.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pet.name,
        schema: PetSchema,
      },
    ]),
  ],
  providers: [TaskSchedulingService],
})
export class TaskSchedulingModule {}
