import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType('AuthorInput')
class AuthorInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  email?: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  id?: string;
}

@InputType('FindPostsInput')
export class FindPostsInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  id?: string;
  @Field(() => AuthorInput, { nullable: true })
  @IsOptional()
  author: AuthorInput;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  text?: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  commentedPostId?: string;
}
