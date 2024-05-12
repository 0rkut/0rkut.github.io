import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '@services/supabase/supabase.service';
import { ReplaySubject, firstValueFrom } from 'rxjs';

export type AuthData = {
  id: string;
  privateKey: CryptoKey;
  publicKey: CryptoKey;
  iv: ArrayBuffer;
};

export type ExportedAuthData = {
  id: string;
  privateKey: string;
  publicKey: string;
  iv: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new ReplaySubject<AuthData | null>();

  private supabaseService = inject(SupabaseService);

  private router = inject(Router);

  private location = inject(Location);

  constructor() {}

  goToLoginAndComeBackAfter() {
    const location = this.location.path();
    if (!location.includes('/identity')) {
      this.router.navigate(['/identity'], {
        queryParams: {
          redirectUrl: this.location.path(),
        },
      });
    }
  }

  async signIn(redirectUrl: string) {
    this.supabaseService.signInWithGoogle({ redirectUrl });
  }

  async signOut() {
    const user = await firstValueFrom(this.user$);
    if (user?.id) {
      this.user$.next(null);
    }
  }
}
