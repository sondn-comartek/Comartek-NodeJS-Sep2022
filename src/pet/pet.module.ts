import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from 'src/schema/pet.schema';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/role.guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature(
      [{
        name: 'pet', schema: PetSchema
      }]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.EXPIRED_IN
        }
      }), 
  ],
  providers: [PetResolver, PetService,
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },]
})
export class PetModule {}
