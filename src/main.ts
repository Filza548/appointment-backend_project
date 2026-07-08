// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// let cachedServer: any;

// export async function bootstrap() {
//   if (cachedServer) {
//     return cachedServer;
//   }

//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   });

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   await app.init();
  
//   // NestJS ke Express instance ko save kar rahe hain
//   cachedServer = app.getHttpAdapter().getInstance();
//   return cachedServer;
// }

// // Local computer par auto-start karne ke liye
// if (process.env.NODE_ENV !== 'production') {
//   bootstrap().then(() => {
//     console.log('Local server is running');
//   });
// }

// // Vercel Serverless ke liye default function handler export
// export default async (req: any, res: any) => {
//   const server = await bootstrap();
//   return server(req, res);
// };




import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedServer: any;

export async function bootstrap() {
  if (cachedServer) {
    return cachedServer;
  }

  const app = await NestFactory.create(AppModule);

  // CORS config: Frontend (Port 3000) ko allow karne ke liye
  app.enableCors({
    origin: [process.env.FRONTEND_URL ,'http://localhost:3000','https://frontend-eight-kappa-23.vercel.app'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Local development ke liye port 3001 par listen karein
  if (process.env.NODE_ENV !== 'production') {
    const port = 3001; 
    await app.listen(port);
    console.log(`🚀 Backend server is running on: http://localhost:${port}`);
    console.log(`🔗 Accepting requests from frontend: http://localhost:3000`);
  } else {
    // Vercel Serverless production ke liye sirf init kaafi hai
    await app.init();
  }

  // NestJS ke Express instance ko save kar rahe hain
  cachedServer = app.getHttpAdapter().getInstance();
  return cachedServer;
}

// Local computer par auto-start karne ke liye
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// Vercel Serverless ke liye default function handler export
export default async (req: any, res: any) => {
  const server = await bootstrap();
  return server(req, res);
};
