import { Resolver, Mutation, Args, Query, Context, ID } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { CreateChatInput } from './dto/create-chat.input';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => User)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}
  @Mutation(() => User)
  createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatService.create(createChatInput);
  }
  @Query(() => [User], { name: 'chats' })
  findAll(
    @Args('userId', { type: () => ID, nullable: true }) userId: string,
    @Context('req') conetext,
  ) {
    return this.chatService.findAll(userId || conetext.user.id);
  }
  @Mutation(() => User)
  removeChat(@Args('id') id: string) {
    return this.chatService.remove(id);
  }
}
