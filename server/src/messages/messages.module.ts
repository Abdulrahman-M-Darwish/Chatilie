import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { MessagesSubscriptionsResolver } from './messages.subscriptions';

@Module({
  providers: [MessagesResolver, MessagesService, MessagesSubscriptionsResolver],
})
export class MessagesModule {}
