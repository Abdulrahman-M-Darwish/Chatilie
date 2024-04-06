import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class FindUserInput {
  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  skip?: number;
  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  take?: number;
}
