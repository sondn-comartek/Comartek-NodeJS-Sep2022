import { UseGuards } from '@nestjs/common';
import { Query , Resolver ,Mutation, Args, ID} from '@nestjs/graphql';
import { Role, Status } from '../auth/decorators';
import { JwtGuard, RoleGuard, StatusGuard } from '../auth/guards';
import { UserRole, UserStatus } from "src/modules/user/types";
import { CreatePetInput } from './dto';
import { UpdatePetInput } from './dto';
import { FindPetArg } from './dto'
import { Pet, PetDocument } from './models';
import { PetService } from './pet.service';

@Resolver()
export class PetResolver {
  constructor(private readonly petService: PetService) {}
  @Query( () => [Pet] )
  async pets(
    @Args() findPetsArg: FindPetArg
  ):Promise<PetDocument[]>{
    return this.petService.findAll(findPetsArg)
  }
  
  @Mutation( () => Pet )
  @Role(UserRole.ADMIN)
  @Status(UserStatus.ACTIVE)
  @UseGuards( JwtGuard , StatusGuard , RoleGuard)
  async createPet(@Args('createPetInput') createPetInput: CreatePetInput):Promise<PetDocument>{
    return this.petService.createOne(createPetInput)
  } 

  @Mutation( () => Pet )
  @Role(UserRole.ADMIN)
  @Status(UserStatus.ACTIVE)
  @UseGuards( JwtGuard , StatusGuard , RoleGuard)
  async updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput){
    return this.petService.updateOne(updatePetInput)
  }

  @Mutation( () => Pet )
  @Role(UserRole.ADMIN)
  @Status(UserStatus.ACTIVE)
  @UseGuards( JwtGuard , StatusGuard , RoleGuard)
  async deletePet(
    @Args('petid', { type : () => ID }) petid: string
  ) {
    return this.petService.deleteOne(petid)
  }
}
