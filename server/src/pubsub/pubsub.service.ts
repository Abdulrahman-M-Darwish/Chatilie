import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class PubSubService extends RedisPubSub implements OnModuleInit {
  constructor() {
    super({
      connection: {
        host: 'chaching_db',
        port: 6379,
      },
    });
  }
  async onModuleInit() {
    // Any initialization code can be placed here
  }
}
