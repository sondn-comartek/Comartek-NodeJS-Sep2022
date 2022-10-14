import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ImagesService } from '../images.service';
import { Image } from '../entities/image.entity';

@Resolver(() => Image)
export class ImageQueryResolver {
    constructor(
        private readonly imagesService: ImagesService
    ) { }

    @Query(() => [Image], { name: 'images' })
    findAll() {
        return this.imagesService.findAll();
    }

    @Query(() => Image, { name: 'image' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.imagesService.findOne(id);
    }
}
