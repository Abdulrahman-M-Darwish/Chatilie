import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { UserSubscriptionsResolver } from './users.subscriptions';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfilesModule],
  providers: [UsersResolver, UsersService, UserSubscriptionsResolver],
  exports: [UsersService],
})
export class UsersModule {}
