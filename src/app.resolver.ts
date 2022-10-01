import { Query } from '@nestjs/graphql';
import { AppService } from './app.service';

export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getHello(): String {
    return this.appService.getHello();
  }
}
