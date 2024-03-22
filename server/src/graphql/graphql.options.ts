import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Context } from 'graphql-ws';
import { join } from 'path';
import { UsersService } from 'src/users/users.service';

export const useFactory: (
  ...args: any[]
) =>
  | Omit<ApolloDriverConfig, 'driver'>
  | Promise<Omit<ApolloDriverConfig, 'driver'>> = (
  usersService: UsersService,
) => {
  return {
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    typePaths: ['./src/schema.gql'],
    definitions: {
      path: join(process.cwd(), 'src/types.ts'),
      outputAs: 'interface',
    },
    subscriptions: {
      'graphql-ws': {
        onConnect: (context: Context<any>) => {
          const { connectionParams, extra } = context;
          if (!connectionParams?.user?.id) return;
          extra['user'] = connectionParams.user;
          usersService.update(extra['user'].id, { isActive: true });
        },
        onDisconnect({ extra }) {
          if (!extra['user']) return;
          usersService.update(extra['user'].id, { isActive: false });
        },
      },
    },
  };
};
