import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
