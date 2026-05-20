// import { Injectable } from '@nestjs/common';
// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// @Injectable()
// export class SupabaseService {
//   private supabase: SupabaseClient;

//   constructor() {
//     this.supabase = createClient(
//       process.env.SUPABASE_URL,
//       process.env.SUPABASE_ANON_KEY,
//     );
//   }

//   // Signup Method
//   async signUp(email: string, pass: string) {
//     return await this.supabase.auth.signUp({ email, password: pass });
//   }

//   // Login Method
//   async signIn(email: string, pass: string) {
//     return await this.supabase.auth.signInWithPassword({ email, password: pass });
//   }

//   // Token Verification (Jo hum Guard mein use karenge)
//   async getUser(token: string) {
//     return await this.supabase.auth.getUser(token);
//   }
// }






import * as ws from 'ws';
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        realtime: {
          transport: ws,
        },
      },
    );
  }

  // Guard ke liye token verify karne wala function
  async verifyUser(token: string) {
    return await this.supabase.auth.getUser(token);
  }
}
