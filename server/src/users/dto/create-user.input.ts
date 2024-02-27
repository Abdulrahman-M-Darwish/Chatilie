import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/profiles/entities/profile.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsStrongPassword()
  password: string;
  @Field()
  @IsISO8601()
  birthDate: string;
  @IsEnum(Gender)
  @Field(() => Gender)
  gender: Gender;
}
