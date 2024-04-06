import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AbstractionEntity } from 'src/database/abstraction.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Reaction } from '../../reactions/entities/reaction.entity';

export enum Privacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  ONLY_FRIENDS = 'ONLY_FRIENDS',
}

registerEnumType(Privacy, { name: 'Privacy' });

@ObjectType()
@Entity()
export class Post extends AbstractionEntity<Post> {
  @Column({ nullable: true })
  @Field({ nullable: true })
  text: string;
  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  mediaUrls: string[];
  @Column({ type: 'enum', enum: Privacy, default: Privacy.PUBLIC })
  @Field(() => Privacy)
  privacy: Privacy;
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  author: User;
  @OneToMany(() => Reaction, (react) => react.post)
  reacts: [Reaction];
  @Field({ nullable: true })
  @Column({ nullable: true })
  rePostedPostId: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  commentedPostId: string;
}
