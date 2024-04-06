import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { FriendsService } from './friends.service';
import { Friend } from './entities/friend.entity';
import { CreateFriendInput } from './dto/create-friend.input';
import { User } from 'src/users/entities/user.entity';
import { IsAuthenticatedGuard } from 'src/auth/is-authenticated.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Friend)
@UseGuards(IsAuthenticatedGuard)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}
  @Mutation(() => Friend)
  createFriend(
    @Args('createFriendInput') createFriendInput: CreateFriendInput,
    @Context('req') context,
  ) {
    return this.friendsService.create(createFriendInput, context.user as User);
  }
  @Mutation(() => String)
  removeFriend(@Args('id') id: string, @Context('req') context) {
    return this.friendsService.remove(context.user, id);
  }
}
