import { IsString } from 'class-validator';
import { CreatePostInput } from './create-post.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {}
