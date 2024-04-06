import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AbstractionEntity } from 'src/database/abstraction.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

export enum NotificationType {
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  POST_LIKED = 'POST_LIKED',
  FRIEND_ACCEPTED = 'FRIEND_ACCEPTED',
}

registerEnumType(NotificationType, { name: 'NotificationType' });

@ObjectType()
@Entity()
export class Notification extends AbstractionEntity<Notification> {
  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  from: User;
  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  to: User;
  @Field()
  @Column()
  message: string;
  @Field(() => Boolean)
  @Column('bool', { default: false })
  isSaw: boolean;
  @Field(() => NotificationType)
  @Column('enum', { enum: NotificationType })
  type: NotificationType;
}
