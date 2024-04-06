import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { FindNotificationsInput } from './dto/find-notifications.input';
import { UpdateNotificationInput } from './dto/update-notification.input';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Query(() => [Notification], { name: 'notifications' })
  findAll(
    @Context('req') context,
    @Args('findNotificationsInput', { nullable: true })
    findNotificationsInput: FindNotificationsInput,
  ) {
    return this.notificationsService.findAll(
      findNotificationsInput?.where?.id || context.user.id,
      findNotificationsInput,
    );
  }
  @Query(() => Int, { name: 'notificationsCount' })
  findCount(
    @Args('userId', { nullable: true }) userId: string,
    @Context('req') context,
  ) {
    return this.notificationsService.findCount(userId || context.user.id);
  }
  @Mutation(() => Notification)
  createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ) {
    return this.notificationsService.create(createNotificationInput);
  }
  @Mutation(() => Notification)
  removeNotification(@Args('id', { type: () => Int }) id: string) {
    return this.notificationsService.remove(id);
  }
  @Mutation(() => Notification)
  updateNotification(
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
  ) {
    return this.notificationsService.update(updateNotificationInput);
  }
}
