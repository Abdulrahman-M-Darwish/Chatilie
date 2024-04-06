import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { UsersModule } from 'src/users/users.module';
import { NotificationSubscriptions } from './notifications.subscriptions';

@Module({
  providers: [
    NotificationsResolver,
    NotificationsService,
    NotificationSubscriptions,
  ],
  imports: [UsersModule],
  exports: [NotificationsService],
})
export class NotificationsModule {}
