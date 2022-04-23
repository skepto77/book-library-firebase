import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';
import * as serviceAccount from '../firebaseServiceAccountKey.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config: object = serviceAccount;
  admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL:
      'https://netology-backend-default-rtdb.europe-west1.firebasedatabase.app/',
  });
  await app.listen(3000);
}
bootstrap();
