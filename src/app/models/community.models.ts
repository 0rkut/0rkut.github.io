export type Community = {
  id: string;
  created_at: string;
  name: string;
  image: string;
  desc: string;
};

export type AddCommunityFormModel = Pick<Community, 'name' | 'image' | 'desc'>;