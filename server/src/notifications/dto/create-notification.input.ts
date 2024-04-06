import { InputType, Field } from '@nestjs/graphql';
import { NotificationType } from '../entities/notification.entity';
import { IsEnum, IsString } from 'class-validator';

@InputType()
export class CreateNotificationInput {
  @Field()
  @IsString()
  from: string;
  @Field()
  @IsString()
  to: string;
  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  type: NotificationType;
}
