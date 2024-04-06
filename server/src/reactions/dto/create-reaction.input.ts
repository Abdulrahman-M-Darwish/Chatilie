import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

export enum ReactType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  FUNNY = 'FUNNY',
  INSPIRE = 'INSPIRE',
}

registerEnumType(ReactType, { name: 'ReactType' });

@InputType()
export class CreateReactionInput {
  @Field()
  @IsString()
  userId: string;
  @Field()
  @IsString()
  postId: string;
}
