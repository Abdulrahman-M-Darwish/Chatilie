import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractionEntity } from 'src/database/abstraction.entity';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Chat extends AbstractionEntity<Chat> {
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
  @ManyToMany(() => User, (user) => user.chatBoxes)
  users: User[];
}
