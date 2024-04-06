import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { NotificationType } from '../entities/notification.entity';

@InputType()
class Where {
  @Field({ nullable: true })
  id?: string;
  @Field(() => Boolean, { nullable: true })
  isSaw?: boolean;
  @Field(() => NotificationType, { nullable: true })
  type?: NotificationType;
}

@InputType()
export class FindNotificationsInput {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  take?: number;
  @Field(() => Where, { nullable: true })
  @IsOptional()
  @IsObject()
  where?: Where;
}
