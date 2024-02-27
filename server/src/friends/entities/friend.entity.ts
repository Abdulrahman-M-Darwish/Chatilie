import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Friend extends User {}
