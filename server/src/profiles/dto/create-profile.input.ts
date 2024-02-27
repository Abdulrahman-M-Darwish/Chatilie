import { Field, InputType } from '@nestjs/graphql';
import { Gender } from '../entities/profile.entity';
import { IsEnum } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateProfileInput {
  @IsEnum(Gender)
  @Field(() => Gender)
  gender: Gender;
  user: User;
}
