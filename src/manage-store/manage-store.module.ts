import { Module } from '@nestjs/common';
import { ManageStoreService } from './manage-store.service';
import { ManageStoreResolver } from './manage-store.resolver';
import { ManagePetService } from 'src/manage-pet/manage-pet.service';
import { ManagePetModule } from 'src/manage-pet/manage-pet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './entities/manage-store.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Order', schema: OrderSchema}]),
    ManagePetModule
  ],
  providers: [ManageStoreResolver, ManageStoreService]
})
export class ManageStoreModule {}
