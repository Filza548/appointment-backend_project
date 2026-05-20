import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedApp: any;

export async function bootstrap() {
  if (cachedApp) {
    return cachedApp;
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
  cachedApp = app.getHttpAdapter().getInstance();
  return cachedApp;
}

// Local computer par auto-start ke liye
if (process.env.NODE_ENV !== 'production') {
  const startLocal = async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: process.env.FRONTEND_URL, credentials: true });
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Server running on port ${port}`);
  };
  startLocal();
}

// Vercel Serverless Gateway handler
export const handler = async (req: any, res: any) => {
  const server = await bootstrap();
  return server(req, res);
};
