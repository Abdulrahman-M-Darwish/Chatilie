import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { EntityManager } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ChatService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly eventEmmiter: EventEmitter2,
  ) {}
  @OnEvent('friendship.created')
  async create(createChatInput: CreateChatInput) {
    const chat = this.entityManager.create(Chat, createChatInput);
    return await this.entityManager.save(chat);
  }
  async findAll(id: string) {
    return await this.entityManager.query(
      'select * from user_chat_boxes_chat CH INNER JOIN "user" U ON U.id = CH."userId" where CH."userId" != $1 and CH."chatId" IN (select "chatId" from user_chat_boxes_chat CH where CH."userId" = $1)',
      [id],
    );
  }
  remove(id: string) {
    return this.entityManager
      .createQueryBuilder()
      .delete()
      .from(Chat)
      .where('id = :id', { id })
      .execute();
  }
}
