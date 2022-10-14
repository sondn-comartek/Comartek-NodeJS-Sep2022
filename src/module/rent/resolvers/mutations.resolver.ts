import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { RentService } from '../rent.service';
import { RentBook } from '../entities/rent.entity';
import { CreateRentInput } from '../dto/create-rent.input';
import { UpdateRentInput } from '../dto/update-rent.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/module/auth/guards/roles.guard';
import { Roles } from 'src/module/auth/decorators/roles.decorator';
import { Role } from 'src/module/auth/enums/role.enum';

@Resolver(() => RentBook)
export class RentMutationResolver {
    constructor(
        private readonly rentService: RentService
    ) { }

    @Mutation(() => RentBook)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    updateRent(@Args('updateRentInput') updateRentInput: UpdateRentInput) {
        return this.rentService.update(updateRentInput.id, updateRentInput);
    }

    @Mutation(() => RentBook)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    removeRent(@Args('id', { type: () => Int }) id: number) {
        return this.rentService.remove(id);
    }
}
