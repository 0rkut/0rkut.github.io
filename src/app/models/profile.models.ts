export interface Profile {
  id: string;
  created_at: string;
  email: string;
  name: string;
  website: string;
  avatar: string;
  nick: string;
  bio: string;
}

export type EditProfileFormModel = Pick<
  Profile,
  'website' | 'avatar' | 'name' | 'nick' | 'bio' | 'id'
>;
