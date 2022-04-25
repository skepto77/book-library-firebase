import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';
import * as serviceAccount from '../firebaseServiceAccountKey.json';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(resolve('./views'));
  app.setViewEngine('ejs');

  const config: object = serviceAccount;
  admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL:
      'https://netology-backend-default-rtdb.europe-west1.firebasedatabase.app/',
  });
  await app.listen(3000);
}
bootstrap();
