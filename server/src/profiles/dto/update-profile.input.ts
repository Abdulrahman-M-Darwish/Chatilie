import { Field, InputType, Int } from '@nestjs/graphql';
import { Gender } from '../entities/profile.entity';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  cover: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bio: string;
  @Field(() => Gender, { nullable: true })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  reputationOfWeek: number;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  reputationOfMonth: number;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  reputationOfYear: number;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  reputationOfAllTime: number;
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  hobbies: string[];
}
