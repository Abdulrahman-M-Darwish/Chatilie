import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity()
export class Reaction {
  @PrimaryColumn()
  userId: string;
  @PrimaryColumn()
  postId: string;
  @JoinColumn()
  @ManyToOne(() => Post, (post) => post.reacts)
  @Field(() => Post)
  post: Post;
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.reactions)
  @Field(() => User)
  user: User;
  @Field(() => Int)
  count: number;
}
