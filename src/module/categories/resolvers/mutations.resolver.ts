import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from '../categories.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryInput } from '../dto/create-category.input';
import { UpdateCategoryInput } from '../dto/update-category.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/module/auth/guards/roles.guard';
import { Roles } from 'src/module/auth/decorators/roles.decorator';
import { Role } from 'src/module/auth/enums/role.enum';

@Resolver(() => Category)
export class CategoryMutationResolver {
    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    @Mutation(() => Category)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
        return this.categoriesService.create(createCategoryInput);
    }

    @Mutation(() => Category)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
        return this.categoriesService.update(updateCategoryInput.id, updateCategoryInput);
    }

    @Mutation(() => Category)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    removeCategory(@Args('id', { type: () => Int }) id: number) {
        return this.categoriesService.remove(id);
    }
}
