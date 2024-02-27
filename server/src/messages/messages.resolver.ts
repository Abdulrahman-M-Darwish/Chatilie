import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  ID,
} from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}
  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.messagesService.create(createMessageInput);
  }
  @Query(() => [Message], { name: 'messages', nullable: true })
  findAll(@Args('chatId', { type: () => ID }) chatId: string) {
    return this.messagesService.findAll(chatId);
  }
  @Mutation(() => Message)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messagesService.update(
      updateMessageInput.messageId,
      updateMessageInput,
    );
  }
  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => Int }) id: string) {
    return this.messagesService.remove(id);
  }
}
