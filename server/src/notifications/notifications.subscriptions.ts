import { Subscription } from '@nestjs/graphql';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { Notification } from './entities/notification.entity';

export class NotificationSubscriptions {
  constructor(private readonly pubSub: PubSubService) {}
  @Subscription(() => Notification)
  onNotificationCreated() {
    return this.pubSub.asyncIterator('onNotificationCreated');
  }
}
