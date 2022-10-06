import { PubSubService } from './../../pubsub/pubsub.service';
import { Args, Int, Resolver, Subscription } from '@nestjs/graphql';

@Resolver(() => [String]) // Buffer type
export class ExtractDataSubscriptionResolver {
  constructor(private readonly pubSubService: PubSubService) {}

  @Subscription(() => [String], {
    resolve: (payload, args, context, info) => {
      return payload?.bufferExcelData;
    },
    filter: (payload, variables, context) => {
      return true;
    },
  })
  async getExcelDataByMediaId() // @Args({ name: 'mediaId', type: () => String }) mediaId: string,
  {
    return await this.pubSubService.listenEvent('dataExtracted');
  }
}
