import { ObjectType, Field } from '@nestjs/graphql';
import { Chat } from 'src/chat/entities/chat.entity';
import { AbstractionEntity } from 'src/database/abstraction.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Message extends AbstractionEntity<Message> {
  @Column({ nullable: true })
  @Field({ nullable: true })
  text: string;
  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  mediaUrls: string[];
  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  author: User;
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
