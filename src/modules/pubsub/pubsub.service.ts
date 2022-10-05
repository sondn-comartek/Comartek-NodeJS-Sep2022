import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class PubsubService {
  async publishEvent(event, payload) {
    return await pubSub.publish(event, payload);
  }

  async subscribeEvent(event) {
    return await pubSub.asyncIterator(event);
  }
}
