import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signup(email: string, pass: string) {
    const { data, error } = await this.supabaseService.supabase.auth.signUp({
      email,
      password: pass,
    });

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async login(email: string, pass: string) {
    const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) throw new UnauthorizedException('Invalid Login Credentials');
    return data;
  }
}
