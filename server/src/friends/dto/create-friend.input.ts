import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateFriendInput {
  @Field()
  @IsString()
  @Length(20, 20)
  friendId: string;
}
