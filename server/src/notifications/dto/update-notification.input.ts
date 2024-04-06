import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { NotificationType } from '../entities/notification.entity';

@InputType()
export class UpdateNotificationInput {
  @IsString()
  @Field()
  id: string;
  @Field(() => NotificationType, { nullable: true })
  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType;
}
