import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/User.model';
import { SupabaseService } from '@services/supabase/supabase.service';
import { Session } from '@supabase/supabase-js';
import { Observable, map } from 'rxjs';

export interface Profile {
  id: string;
  email: string;
  username?: string;
  website?: string;
  avatar_url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabaseService = inject(SupabaseService);

  private router = inject(Router);

  private location = inject(Location);

  user$!: Observable<User | undefined>;

  constructor() {
    this.connectToUser();
  }

  private connectToUser() {
    this.user$ = this.supabaseService.session$.pipe(
      map((session) => {
        return this.getUserIdentityData(session);
      }),
    );
  }

  profile(userId: string) {
    return this.supabaseService.db
      .from('profile')
      .select(`username, website, avatar_url, id, email`)
      .eq('id', userId)
      .single();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
    };

    if (update.id) {
      return this.supabaseService.db
        .from('profile')
        .update(update)
        .eq('id', update.id);
    } else {
      console.log('UPSERT', update);
      return this.supabaseService.db
        .from('profile')
        .upsert(update)
        .then((a) => {
          console.log('UPSERT', update);
        });
    }
  }

  goToLogin() {
    const location = this.location.path();
    if (!location.includes('/login')) {
      this.router.navigate(['/login'], {
        queryParams: {
          redirectUrl: this.location.path(),
        },
      });
    }
  }

  private getUserIdentityData(session: Session | null): User | undefined {
    if (session?.user) {
      const identityData = session.user.identities?.reduce((acc, curr) => {
        return { ...curr.identity_data, ...acc };
      }, {});

      const { app_metadata, identities, user_metadata, ...userData } =
        session.user;

      const userMetaData = session.user.user_metadata;

      return {
        ...identityData,
        ...userData,
        ...userMetaData,
      } as unknown as User;
    } else {
      return undefined;
    }
  }
}
