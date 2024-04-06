import { Module } from '@nestjs/common';
import { FriendsResolver } from './friends.resolver';
import { UsersModule } from 'src/users/users.module';
import { FriendsService } from './friends.service';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [UsersModule, NotificationsModule],
  providers: [FriendsResolver, FriendsService],
})
export class FriendsModule {}
