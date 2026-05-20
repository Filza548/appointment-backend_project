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

  if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
} else {
  await app.init();
}

  cachedServer = app.getHttpAdapter().getInstance();
  return cachedServer;
}

// Local computer par auto-start karne ke liye
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// Vercel serverless request handler export
export const handler = async (req: any, res: any) => {
  const server = await bootstrap();
  return server(req, res);
};
