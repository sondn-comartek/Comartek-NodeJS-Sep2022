import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class PubsubService {
  publicEvent(triggerName: string, payload: any) {
    return pubSub.publish(triggerName, payload);
  }

  subscribeEvent(triggerName: string) {
    return pubSub.asyncIterator(triggerName);
  }
}
