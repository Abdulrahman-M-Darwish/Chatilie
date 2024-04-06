import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UploadApiResponse } from 'cloudinary';

@ObjectType()
export class Media implements UploadApiResponse {
  @Field(() => [String])
  access_control: string[];
  @Field()
  access_mode: string;
  @Field(() => Int)
  bytes: number;
  @Field(() => [[String, Int]])
  colors?: [string, number][];
  context: object;
  @Field()
  created_at: string;
  @Field()
  etag: string;
  @Field()
  format: string;
  @Field(() => Int)
  height: number;
  metadata: object;
  @Field(() => [String])
  moderation: string[];
  @Field()
  original_filename: string;
  pages: number;
  @Field(() => Boolean)
  placeholder: boolean;
  @Field()
  public_id: string;
  @Field()
  resource_type: 'image' | 'video' | 'raw' | 'auto';
  @Field()
  secure_url: string;
  @Field()
  signature: string;
  @Field(() => [String])
  tags: string[];
  @Field()
  type: string;
  @Field()
  url: string;
  @Field(() => Int)
  version: number;
  @Field(() => Int)
  width: number;
}
