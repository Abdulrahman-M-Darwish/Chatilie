import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  email: string;
  @Field()
  @IsStrongPassword()
  password: string;
}
