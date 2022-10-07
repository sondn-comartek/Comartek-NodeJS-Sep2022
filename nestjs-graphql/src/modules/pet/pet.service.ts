import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreatePetInput } from './dto';
import { UpdatePetInput } from './dto';
import { FindPetArg } from './dto';
import { PetDocument } from './models';
import { PetRepository } from './pet.repository';
import { PetStatus } from './types';

@Injectable()
export class PetService {
    constructor( private readonly petRepository: PetRepository){}
    async createOne(createPetInput: CreatePetInput):Promise<PetDocument>{
        return await this.petRepository.Create({
            petid : v4() ,
            ...createPetInput
        })
    }
    async updateOne(updatePetInput: UpdatePetInput):Promise<PetDocument>{
        const { petid , ...rest } = updatePetInput ;
        const pet = await this.petRepository.FindOneAndUpdate({
            petid : petid ,
        } , rest , { new : true} );
        if(!pet) throw new NotFoundException()
        return pet ;
    }
    async findAll(findPetsArg: FindPetArg):Promise<PetDocument[]>{
        const pets = await this.petRepository.FindAll(findPetsArg)
        if(!pets) throw new NotFoundException 
        return pets 
    }

    async deleteOne(petid: string ){
        const pet = await this.petRepository.FindOneAndUpdate({
            petid : petid
        } , {status :PetStatus.UNAVAIABLE} ,{new : true })
        if(!pet) throw new BadRequestException()
        return pet ;
    }
}
