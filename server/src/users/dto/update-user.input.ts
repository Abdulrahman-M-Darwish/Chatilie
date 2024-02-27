import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { UpdateProfileInput } from 'src/profiles/dto/update-profile.input';

@InputType()
export class UpdateUserInput {
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  id?: string;
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  password?: string;
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  username?: string;
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  avatar?: string;
  @IsObject()
  @IsOptional()
  @Field(() => UpdateProfileInput, { nullable: true })
  profile?: UpdateProfileInput;
}
