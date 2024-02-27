import { IsString } from 'class-validator';
import { CreateMessageInput } from './create-message.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
  @IsString()
  @Field()
  messageId: string;
}
