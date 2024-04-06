import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProfilesModule } from './profiles/profiles.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PubsubModule } from './pubsub/pubsub.module';
import { MediasModule } from './medias/medias.module';
import { useFactory } from './graphql/graphql.options';
import { FriendsModule } from './friends/friends.module';
import { MessagesModule } from './messages/messages.module';
import { ChatModule } from './chat/chat.module';
import { UsersService } from './users/users.service';
import { ReactionsModule } from './reactions/reactions.module';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    DatabaseModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory,
      inject: [UsersService],
      imports: [UsersModule],
    }),
    UsersModule,
    ProfilesModule,
    PostsModule,
    AuthModule,
    PubsubModule,
    MediasModule,
    FriendsModule,
    MessagesModule,
    ChatModule,
    ReactionsModule,
    ElasticsearchModule,
    NotificationsModule,
  ],
})
export class AppModule {}
