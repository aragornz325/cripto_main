import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import mongoURI from './config/keys';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NONAME } from 'dns';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

const MongoStore = require('connect-mongo');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['debug'],
  });
  app.enableCors({
    origin: [
      'https://cryptgo.co',
      'https://api.cryptgo.co',
      'https://apicasino.herokuapp.com',
      'http://localhost:3000',
      'https://casinocrypto.netlify.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });
  app.use(cookieParser());
  app.use(
    session({
      secret: 'mitsecret',
      resave: false,
      saveUninitialized: true,
      proxy: true,
      name: 'crypgoUser',
      cookie: {
        secure: true, // uncomment on prod
        maxAge: 3600000,
        sameSite: 'none',
        httpOnly: true,
      },
      store: MongoStore.create({
        mongoUrl:
          'mongodb+srv://martinnegro:conocedor@cluster0.eugyj.mongodb.net/pokertest?retryWrites=true&w=majority',
      }),
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('tiny'));
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
