import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { customAlphabet } from 'nanoid';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
export const nanoid = customAlphabet(alphabet, 20);

@ObjectType()
export abstract class AbstractionEntity<T> {
  @PrimaryColumn({
    length: 20,
    unique: true,
  })
  @Field(() => ID)
  id: string;
  @Field()
  @CreateDateColumn()
  createdAt: string;
  @Field()
  @UpdateDateColumn()
  updatedAt: string;
  @BeforeInsert()
  beforeInsert() {
    this.id = nanoid();
  }
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
