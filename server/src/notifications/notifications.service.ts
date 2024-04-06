import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { EntityManager } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { UsersService } from 'src/users/users.service';
import { FindNotificationsInput } from './dto/find-notifications.input';
import { makeNotificationMessage } from './utils';
import { UpdateNotificationInput } from './dto/update-notification.input';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly usersService: UsersService,
  ) {}
  async create({ from, to, type }: CreateNotificationInput) {
    const message = makeNotificationMessage(type);
    const notification = this.entityManager.create(Notification, {
      from: { id: from },
      to: { id: to },
      message,
    });
    const savedNotification = await this.entityManager.save(notification);
    const find = await this.findOne(savedNotification.id);
    return find;
  }
  async findAll(id: string, { where, take }: FindNotificationsInput) {
    return await this.entityManager.find(Notification, {
      take,
      where: { to: { id }, ...where },
      relations: {
        from: true,
        to: true,
      },
    });
  }
  async findCount(userId: string) {
    return await this.entityManager.count(Notification, {
      where: { to: { id: userId } },
    });
  }
  async findOne(id: string) {
    return await this.entityManager.findOne(Notification, {
      where: [{ to: { id } }],
      relations: { from: true },
    });
  }
  async remove(id: string) {
    const notification = await this.findOne(id);
    await this.entityManager.remove(notification);
    return notification;
  }
  async update(updateNotificationInput: UpdateNotificationInput) {
    const notification = await this.entityManager.preload(
      Notification,
      updateNotificationInput,
    );
    await this.entityManager.save(notification);
    return notification;
  }
}
