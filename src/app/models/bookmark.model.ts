import { AssetModel } from '@models/asset.model';

export type BookmarkModel = AssetModel<{
  title: string;
  description: string;
  url: string;
}>;
