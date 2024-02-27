import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ReactionsService } from './reactions.service';
import { Reaction } from './entities/reaction.entity';
import { CreateReactionInput } from './dto/create-reaction.input';
import { FindReaction } from './entities/find-reactions.entity';

@Resolver(() => Reaction)
export class ReactionsResolver {
  constructor(private readonly reactionsService: ReactionsService) {}
  @Mutation(() => Reaction)
  createReaction(
    @Args('createReactionInput') createReactionInput: CreateReactionInput,
    @Context('req') context,
  ) {
    return this.reactionsService.create(createReactionInput, context.user);
  }
  @Query(() => FindReaction, { name: 'reactions' })
  findAll(@Args('postId') postId: string) {
    return this.reactionsService.findAll(postId);
  }
  @Mutation(() => String)
  removeReaction(@Args('postId') postId: string, @Context('req') context) {
    return this.reactionsService.remove(postId, context.user.id);
  }
}
