import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { EntityManager } from 'typeorm';
import { Message } from './entities/message.entity';
import { PubSubService } from 'src/pubsub/pubsub.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly pubSubService: PubSubService,
  ) {}
  async create(createMessageInput: CreateMessageInput) {
    const { chatId, userId, ...message } = createMessageInput;
    const meesage = this.entityManager.create(Message, {
      ...message,
      chat: { id: chatId },
      author: { id: userId },
    });
    const { id } = await this.entityManager.save(meesage);
    const messageCreated = await this.entityManager.findOne(Message, {
      where: { id },
      relations: ['author'],
    });
    this.pubSubService.publish('messageCreated', { messageCreated });
    return messageCreated;
  }
  async findAll(chatId: string) {
    return await this.entityManager.find(Message, {
      where: { chat: { id: chatId } },
      relations: ['author'],
    });
  }
  async update(id: string, updateMessageInput: UpdateMessageInput) {
    return await this.entityManager
      .createQueryBuilder()
      .update(Message)
      .set({ updateMessageInput })
      .where('id = :id', { id })
      .execute();
  }
  async remove(id: string) {
    return await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where('id = :id', { id })
      .execute();
  }
}
