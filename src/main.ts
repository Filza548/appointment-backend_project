// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);
// //   await app.listen(process.env.PORT ?? 3000);
// // }
// // bootstrap();


// // backend/src/main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common'; // ✅ yeh add karo

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   // CORS enable karo
//   app.enableCors({
//     origin: process.env.FRONTEND_URL, // Tumhara frontend ka URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });


//   // ✅ Yeh add karo
//   app.useGlobalPipes(new ValidationPipe({
//     whitelist: true,
//     forbidNonWhitelisted: true,
//     transform: true,
//   }));
//   if(process.env.PRODUCTION === 'TRUE') {
//     await app.listen(3001); // Backend 3001 par chalao (3000 par frontend hai)
//   }else {
//     export default app; // Testing ke liye app export karo
//   }

// }
// bootstrap();






// import { createApp } from './app';

// async function bootstrap() {
//   const app = await createApp();

//   const port = process.env.PORT || 3001;

//   await app.listen(port);

  

//   console.log(`Server running on ${port}`);
// }

// bootstrap();



import { createApp } from './app';

let cachedApp: any = null;

export async function bootstrap() {
  if (cachedApp) {
    return cachedApp;
  }
  
  const app = await createApp();
  cachedApp = app;
  
  // Vercel serverless environment mein PORT automatically milta hai
  const port = process.env.PORT || 3001;
  
  await app.listen(port);
  console.log(`Server running on ${port}`);
  
  return app;
}

// Local development ke liye
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// Vercel ke liye export
export default bootstrap;