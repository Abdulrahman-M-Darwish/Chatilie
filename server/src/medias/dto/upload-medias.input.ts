import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class UploadMediasInput {
  @Field()
  @IsString()
  folder: string;
  @Field(() => [String])
  @IsArray()
  base64EncodedImages: string[];
}
