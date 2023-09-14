import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
} from '@supabase/supabase-js';
import { distinctUntilChanged, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly innerSession$ = new ReplaySubject<AuthSession | null>();

  readonly session$ = this.innerSession$.pipe(distinctUntilChanged());

  db = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() {
    this.connectToSession();
  }

  onAuthChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    return this.db.auth.onAuthStateChange(callback);
  }

  signInWithOtp(email: string) {
    return this.db.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/validate-auth`,
      },
    });
  }

  signInWithGoogle({ redirectUrl }: { redirectUrl: string }) {
    this.db.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/validate-auth?redirectUrl=${redirectUrl}`,
      },
    });
  }

  async signOut() {
    await this.db.auth.signOut();
  }

  downLoadImage(path: string) {
    return this.db.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.db.storage.from('avatars').upload(filePath, file);
  }

  private connectToSession() {
    this.onAuthChanges((code: AuthChangeEvent, session) => {
      if (code === 'INITIAL_SESSION') {
        this.innerSession$.next(session);
      }

      if (code === 'SIGNED_OUT') {
        this.innerSession$.next(null);
      }
    });
  }
}
