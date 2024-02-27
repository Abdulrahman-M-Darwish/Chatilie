import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { Message } from './entities/message.entity';

@Resolver(() => Message)
export class MessagesSubscriptionsResolver {
  constructor(private readonly pubSubService: PubSubService) {}
  @Subscription(() => Message)
  messageCreated() {
    return this.pubSubService.asyncIterator('messageCreated');
  }
}
