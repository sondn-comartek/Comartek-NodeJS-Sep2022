import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PetService } from './pet.service';
import { UploadPetPhotoOutPut } from './entities/uploadpetphoto.output';
import { UploadPetPhotoInput } from './dto/uploadpetphoto.input';
import { CreateNewPetOutPut, DeletePetOutPut, PetOutPut, updatePetOutPut } from './entities/pet.output';
import { CreateNewPetInput,  DeletePetInput, FindPet, UpdatePetInput  } from './dto/pet.input';
import {Inject, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/decorator/user.decorator';

import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
@Resolver()
export class PetResolver {
  constructor(private readonly petService: PetService ,
    @Inject(REQUEST) private readonly request: Request) {}

  @Query(() => [PetOutPut] ) 
  async listAllPet() {
    return await this.petService.listAllPet()
  }
  @Query(() => [PetOutPut])
  async findPet(@Args('findpet') findPet: FindPet) {
    const properties = ['_id', 'tags', 'status']
    let findRule = {}
    for(const element in findPet) {
      if(element === 'id') { 
        findRule['_id'] = findPet['id']
        continue
      }
      if(element === 'tags') {
        findRule[element] = {"$in": findPet.tags}
        continue
      }
      findRule[element] = findPet[element]
    }
    return await this.petService.findPet(findRule)
  }

  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin)
  @Mutation(() => CreateNewPetOutPut, {name: "createnewpet"}) 
  async createNewPet(@User() user: any,@Args('createpet') createPetInput: CreateNewPetInput) {
    const newPet = await this.petService.createNewPet(createPetInput)
    return {
      id: newPet.id,
      category: newPet.category,
      name: newPet.name,
      tags: newPet.tags,
      status: newPet.status
    }
  }

  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin)
  @Mutation(() => updatePetOutPut)
  async updatePet(@Args('updatepet') updatepetInput: UpdatePetInput) {
    const pet = await this.petService.updatePet(updatepetInput)

    return {
      ...pet
    }
  }
  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin)
  @Mutation(() =>DeletePetOutPut)
  async deletePet (@Args('deletepet') deletepetInput: DeletePetInput) {
    await this.petService.detePet(deletepetInput.id)
    return {
     status: 200,
     message: "delete scuccess"
    }
  }
  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin)
  @Mutation(() => UploadPetPhotoOutPut, {name: "UploadPetPhoto"})
  async uploadPhotoPet(@Args('uploadphotopet') uploadData: UploadPetPhotoInput) {
    const { createReadStream, filename } = await uploadData.image;
    await this.petService.handdleFileStream(createReadStream(),filename, uploadData.id)
    return {
      status: 200,
      message: "ok"
    }
  }

 
}
