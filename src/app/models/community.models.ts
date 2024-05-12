export type Community = {
  id: string;
  created_at: string;
  name: string;
  image: string;
  desc: string;
  creator: string;
};

export type EditCommunityFormModel = {
  id?: string;
  name: string;
  image: string;
  desc: string;
};
