
// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import * as jwt from 'jsonwebtoken';
// import { Request } from 'express';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class SupabaseAuthGuard implements CanActivate {
//   constructor(private configService: ConfigService) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();
//     const authHeader = request.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('No token provided');
//     }

//     const token = authHeader.split(' ')[1];
//     const jwtSecret = this.configService.get<string>('SUPABASE_JWT_SECRET'); // ✅ .env name check karo

//     if (!jwtSecret) {
//       throw new UnauthorizedException('JWT secret not configured');
//     }

//     try {
//       const decoded = jwt.verify(token, jwtSecret);
//       request['user'] = decoded; // ✅ decode ki jagah decoded
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     return true;
//   }
// }




// yeah code mera chal gaya tha postman se relate authentication ho rahi thi wahaa per 
// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import * as jwt from 'jsonwebtoken';
// import { Request } from 'express';

// @Injectable()
// export class SupabaseAuthGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest<Request>();
//     const authHeader = request.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('No token provided');
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//       // 🚀 ES256 ke liye 'decode' use karein kyunki verification ke liye 
//       // simple secret string kafi nahi hai (Asymmetric key chahiye hoti hai)
//       const decoded = jwt.decode(token); 
      
//       if (!decoded) {
//         throw new UnauthorizedException('Invalid token format');
//       }

//       request['user'] = decoded;
//       return true;
//     } catch (error: any) {
//       throw new UnauthorizedException('Token validation failed');
//     }
//   }
// }






// yeah direct supabase me use hone wala code hai 
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    
    // Supabase client se user verify karein
    const { data, error } = await this.supabaseService.verifyUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    request['user'] = data.user;
    return true;
  }
}
