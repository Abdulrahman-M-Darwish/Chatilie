import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Reaction } from './reaction.entity';

@ObjectType({ isAbstract: true })
export class FindReaction {
  @Field(() => [Reaction])
  reactions: [Reaction];
  @Field(() => Int)
  count: number;
}
