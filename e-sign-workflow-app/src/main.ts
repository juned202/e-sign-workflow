import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.use(cors());

  // Serve frontend files
  app.use(express.static(path.join(__dirname, '..', 'frontend')));

  // Serve static files from the 'files' directory
  app.use('/files', express.static('files'));

  await app.listen(3000);
}
bootstrap();
