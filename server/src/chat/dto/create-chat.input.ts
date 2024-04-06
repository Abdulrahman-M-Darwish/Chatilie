import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType({ isAbstract: true })
class CreateChatUsersInput {
  @IsString()
  @Field()
  id: string;
}

@InputType()
export class CreateChatInput {
  @Field(() => [CreateChatUsersInput])
  @IsArray()
  users: CreateChatUsersInput[];
}
