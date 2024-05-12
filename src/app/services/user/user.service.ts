import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '@models/profile.models';
import { SupabaseService } from '@services/supabase/supabase.service';
import { from, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabaseService = inject(SupabaseService);

  private router = inject(Router);

  private location = inject(Location);

  user$ = this.supabaseService.session$.pipe(
    map((session) => {
      return session?.user || null;
    }),
  );

  profile$ = this.user$.pipe(
    switchMap((user) => {
      if (user) {
        const profile = this.supabaseService.db
          .from('profile')
          .select(`website, avatar, id, email, name, nick`)
          .eq('id', user?.id)
          .single()
          .then((res) => res.data);
        return from(profile);
      } else {
        return of(null);
      }
    }),
  );

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
    };
    return this.supabaseService.db.from('profile').upsert(update);
  }

  goToLoginAndComeBackAfter() {
    const location = this.location.path();
    if (!location.includes('/login')) {
      this.router.navigate(['/login'], {
        queryParams: {
          redirectUrl: this.location.path(),
        },
      });
    }
  }
}
