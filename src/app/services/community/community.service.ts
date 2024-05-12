import { Injectable } from '@angular/core';
import { Community, EditCommunityFormModel } from '@models/community.models';
import { SupabaseService } from '@services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private supabaseService: SupabaseService) {}

  upsert(data: EditCommunityFormModel) {
    console.log('upsert', data);
    return this.supabaseService.db.from('community').upsert(data);
  }

  async list() {
    return (await this.supabaseService.db.from('community').select('*')).data;
  }

  async get(id: string) {
    return (
      await this.supabaseService.db
        .from('community')
        .select('*')
        .eq('id', id)
        .single<Community>()
    ).data;
  }

  async delete(id: string) {
    return await this.supabaseService.db
      .from('community')
      .delete()
      .eq('id', id);
  }
}
