import { Injectable } from '@angular/core';
import { AddCommunityFormModel } from '@models/community.models';
import { SupabaseService } from '@services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private supabaseService: SupabaseService) {}

  insert(data: AddCommunityFormModel) {
    return this.supabaseService.db.from('community').insert(data);
  }

  async communities() {
    return (await this.supabaseService.db.from('community').select()).data;
  }
}
