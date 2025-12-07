export interface CacheStore {
  save: () => Promise<void>;
  delete: () => Promise<void>;
}