import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class SearchResults {
  @Field(() => [User], { nullable: true })
  users: User[];
  @Field(() => [Post], { nullable: true })
  posts: Post[];
}
