import { Resolver, Subscription } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PubSubService } from 'src/pubsub/pubsub.service';

@Resolver(() => Post)
export class PostsSubscriptionsResolver {
  constructor(private readonly pubSubService: PubSubService) {}
  @Subscription(() => Post)
  postAdded() {
    return this.pubSubService.asyncIterator('postAdded');
  }
  @Subscription(() => Post)
  postUpdated() {
    return this.pubSubService.asyncIterator('postUpdated');
  }
  @Subscription(() => String)
  postRemoved() {
    return this.pubSubService.asyncIterator('postRemoved');
  }
}
