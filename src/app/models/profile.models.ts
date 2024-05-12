export interface Profile {
  id: string;
  email: string;
  name: string;
  website: string;
  avatar: string;
  nick: string;
}

export type ProfileFormModel = Pick<
  Profile,
  'website' | 'avatar' | 'name' | 'nick'
>;
