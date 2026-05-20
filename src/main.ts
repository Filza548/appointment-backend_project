import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedServer: any;

export async function bootstrap() {
  if (cachedServer) {
    return cachedServer;
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();
  
  // NestJS ke Express instance ko save kar rahe hain
  cachedServer = app.getHttpAdapter().getInstance();
  return cachedServer;
}

// Local computer par auto-start karne ke liye
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(() => {
    console.log('Local server is running');
  });
}

// Vercel Serverless ke liye default function handler export
export default async (req: any, res: any) => {
  const server = await bootstrap();
  return server(req, res);
};
