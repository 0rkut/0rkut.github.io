import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  createClient,
} from '@supabase/supabase-js';
import { ReplaySubject, distinctUntilChanged } from 'rxjs';

const ASSET_COLLECTION_NAME = 'asset';

export type SupabaseFilter = { type: 'eq'; field: string; value: any }[];

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

  async getItemByCollectionAndId<T = unknown>(
    collection: string,
    itemId: string,
  ) {
    const result = await this.db
      .from(collection)
      .select<string, T>()
      .limit(1)
      .eq('id', itemId);
    const encryptedItem = result.data?.[0];
    return encryptedItem;
  }

  async setAuthItem(collectionName: string, authData: any) {
    const result = await this.db.from(collectionName).upsert(authData).select();
    return result.data?.[0];
  }

  onAuthChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    return this.db.auth.onAuthStateChange(callback);
  }

  signInWithOtp(email: string, redirectUrl: string) {
    return this.db.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/validate-auth?redirectUrl=${redirectUrl}`,
      },
    });
  }

  signInWithGoogle(redirectUrl?: string) {
    const redirectTo = `${window.location.origin}/validate-auth?redirectUrl=${redirectUrl}`;
    this.db.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
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
