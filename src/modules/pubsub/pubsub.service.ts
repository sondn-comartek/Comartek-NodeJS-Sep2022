import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class PubSubService {
  async listenEvent(triggerName: string) {
    return pubSub.asyncIterator(triggerName);
  }

  async registerEvent(triggerName: string, payload: any) {
    return await pubSub.publish(triggerName, payload);
  }
}
