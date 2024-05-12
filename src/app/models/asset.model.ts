export type AssetType = 'bookmark';

export interface AssetModel<T = unknown> {
  id: string; // composition of ownerId_assetType_assetUuid
  encrypted: string;
  decrypted: T & { created: number };
  owner: string;
  type: AssetType;
}
