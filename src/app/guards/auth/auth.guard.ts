import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '@services/supabase/supabase.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (_, { url: redirectUrl }) => {
  const router = inject(Router);
  const supabaseService = inject(SupabaseService);
  console.log(redirectUrl);
  return supabaseService.session$.pipe(
    map((session) => {
      console.log('session', session?.user?.user_metadata?.['name']);
      return (
        !!session?.user ||
        router.createUrlTree(['/auth'], {
          queryParams: { redirectUrl },
        })
      );
    }),
  );
};
