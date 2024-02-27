import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserSubscriptionsResolver {
  constructor(private readonly pubSubService: PubSubService) {}
  @Subscription(() => User)
  userUpdated() {
    return this.pubSubService.asyncIterator('userUpdated');
  }
}
