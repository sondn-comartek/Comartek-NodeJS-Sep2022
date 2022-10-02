import { Query, Resolver } from '@nestjs/graphql';
import { BookCategory } from './entities/book.category.entity';
import { StatisticalService } from './statistical.service';

@Resolver()
export class StatisticalResolver {
  constructor(private statisticalService: StatisticalService) {}
  @Query(() => [BookCategory], { name: 'total_category' })
  async findTotal() {
    return await this.statisticalService.findTotalBookEachCategory();
  }
}
