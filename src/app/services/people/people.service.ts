import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '@services/supabase/supabase.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private supabaseService = inject(SupabaseService);

  list(page = 1) {
    return from(
      this.supabaseService.db
        .from('profile')
        .select()
        .then((a) => {
          return a.data || [];
        }),
    );
  }
}
