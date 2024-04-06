import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  text: string;
  @IsArray()
  @IsOptional()
  @Field(() => [String], { nullable: true })
  mediaUrls: string[];
  @IsString()
  @Field()
  userId: string;
  @IsString()
  @Field()
  chatId: string;
}
