import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Image } from '../entities/image.entity';
import { ImagesService } from '../images.service';
import { CreateImageInput } from '../dto/create-image.input';

@Resolver(() => Image)
export class ImageMutationResolver {
    constructor(
        private readonly imagesService: ImagesService
    ) { }

    @Mutation(() => String)
    createImage(@Args('createImageInput') createImageInput: CreateImageInput) {
        return this.imagesService.create(createImageInput);
    }
}
