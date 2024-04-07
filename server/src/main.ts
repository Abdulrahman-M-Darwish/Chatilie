import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    abortOnError: true,
  });
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
    credentials: true,
  });
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  redisClient.connect().catch(console.error);
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'SESSION:',
  });
  app.use(cookieParser());
  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: false,
        sameSite: false,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(8080);
}
bootstrap();
