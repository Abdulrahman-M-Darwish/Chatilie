import { Injectable } from '@nestjs/common';
import { CreateFriendInput } from './dto/create-friend.input';
import { EntityManager } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notifications/entities/notification.entity';

@Injectable()
export class FriendsService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
    private readonly notificationsService: NotificationsService,
  ) {}
  async create({ friendId }: CreateFriendInput, user: User) {
    const friend = await this.usersService.findOne(friendId);
    friend.friends = [...(friend.friends || []), user];
    const newFriend = await this.entityManager.save(friend);
    this.eventEmitter.emit('friendship.created', {
      users: [{ id: newFriend.id }, { id: user.id }],
    });
    this.notificationsService.create({
      from: user.id,
      to: friend.id,
      type: NotificationType.FRIEND_ACCEPTED,
    });
    return newFriend;
  }
  async remove(user: User, friendId: string) {
    await this.entityManager
      .createQueryBuilder()
      .delete()
      .from('user_friends_user')
      .where(
        'user_friends_user."userId_1" = :userId AND user_friends_user."userId_2" = :friendId OR user_friends_user."userId_2" = :userId AND user_friends_user."userId_1" = :friendId',
        { userId: user.id, friendId },
      )
      .execute();
    return 'DELETED';
  }
}
