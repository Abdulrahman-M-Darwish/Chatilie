import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { Privacy } from '../entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreatePostInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  text: string;
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  mediaUrls: string[];
  @Field(() => Privacy, { nullable: true })
  @IsEnum(Privacy)
  @IsOptional()
  privacy: Privacy;
  author: User;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  rePostedPostId?: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  commentedPostId?: string;
}
