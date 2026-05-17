import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: any) {
    return await this.authService.signup(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: any) {
    return await this.authService.login(body.email, body.password);
  }
}
