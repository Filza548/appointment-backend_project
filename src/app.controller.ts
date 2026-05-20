// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }




import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Isko khali rehne dein taake yeh root (/) par chale
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // Jab koi khali main link kholega
  getHello(): string {
    return '🚀 Backend Deployed Successfully on Vercel!';
  }
}
