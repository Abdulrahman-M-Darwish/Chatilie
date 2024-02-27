import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: parseInt(configService.getOrThrow('POSTGRES_PORT')),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DB'),
        username: configService.getOrThrow('POSTGRES_USER'),
        autoLoadEntities: true,
        synchronize: true,
        entities: ['dist/**/*.entity.js'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
