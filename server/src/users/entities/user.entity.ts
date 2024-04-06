import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/chat/entities/chat.entity';
import { AbstractionEntity } from 'src/database/abstraction.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Reaction } from 'src/reactions/entities/reaction.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Notification } from 'src/notifications/entities/notification.entity';

@Entity()
@ObjectType()
export class User extends AbstractionEntity<User> {
  @Field()
  @Column({ unique: true })
  name: string;
  @Field()
  @Column({ unique: true })
  email: string;
  @Field()
  @Column({ default: true })
  isActive: boolean;
  @Field()
  @Column()
  avatar: string;
  @Column()
  password: string;
  @Field()
  @Column()
  birthDate: string;
  @Field()
  @Column()
  username: string;
  @ManyToMany(() => User, { cascade: ['remove'] })
  @JoinTable()
  @Field(() => [User])
  friends: User[];
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  @Field(() => Profile)
  profile: Profile;
  @OneToMany(() => Post, (post) => post.author)
  @Field(() => [Post])
  posts: Post[];
  @OneToMany(() => Notification, (notification) => notification.to)
  @Field(() => [Notification])
  notifications: Notification[];
  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  chatBoxes: Chat;
  @Field({ nullable: true })
  chatId: string;
  @Field(() => Int)
  friendsCount: number;
  @OneToMany(() => Reaction, (react) => react.user)
  reactions: Reaction;
}
