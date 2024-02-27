import { Module } from '@nestjs/common';
import { FriendsResolver } from './friends.resolver';
import { UsersModule } from 'src/users/users.module';
import { FriendsService } from './friends.service';

@Module({
  imports: [UsersModule],
  providers: [FriendsResolver, FriendsService],
})
export class FriendsModule {}
