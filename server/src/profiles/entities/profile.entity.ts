import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AbstractionEntity } from 'src/database/abstraction.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

export enum MaterialStatus {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}
registerEnumType(MaterialStatus, { name: 'MaterialStatus' });

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
registerEnumType(Gender, { name: 'Gender' });

@ObjectType()
@Entity()
export class Profile extends AbstractionEntity<Profile> {
  @Field({ nullable: true })
  @Column({ nullable: true })
  cover: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  livesIn: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;
  @Field(() => Gender)
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;
  @Field({ nullable: true })
  @Column({ nullable: true })
  education: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  workingAt: string;
  @Field(() => MaterialStatus, { nullable: true })
  @Column({
    type: 'enum',
    enum: MaterialStatus,
    nullable: true,
  })
  materialStatus: MaterialStatus;
  @Field(() => Int)
  @Column({ type: 'int', nullable: true, default: 0 })
  reputationOfWeek: number;
  @Field(() => Int)
  @Column({ type: 'int', nullable: true, default: 0 })
  reputationOfMonth: number;
  @Field(() => Int)
  @Column({ type: 'int', nullable: true, default: 0 })
  reputationOfYear: number;
  @Field(() => Int)
  @Column({ type: 'int', nullable: true, default: 0 })
  reputationOfAllTime: number;
  @OneToOne(() => User, (user) => user.profile)
  @Field(() => User)
  user: User;
  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  hobbies: string[];
}
