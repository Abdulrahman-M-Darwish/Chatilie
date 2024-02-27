import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { FindPostsInput } from './dto/find-posts.input';
import { UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/auth/is-authenticated.guard';

@Resolver(() => Post)
@UseGuards(IsAuthenticatedGuard)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context('req') context,
  ) {
    return this.postsService.create({
      ...createPostInput,
      author: context.user,
    });
  }
  @Query(() => [Post], { name: 'posts', nullable: true })
  findAll(
    @Args('findPostsInput', { nullable: true }) findPostsInput: FindPostsInput,
  ) {
    return this.postsService.findAll(findPostsInput);
  }
  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.postsService.findOne(id);
  }
  @Mutation(() => Post)
  updatePost(
    @Args('id', { type: () => ID }) id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postsService.update(id, updatePostInput);
  }
  @Mutation(() => Post)
  removePost(@Args('id', { type: () => ID }) id: string) {
    return this.postsService.remove(id);
  }
}
