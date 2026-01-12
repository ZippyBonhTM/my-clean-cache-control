export interface CacheStore {
  save: (key: string, value: any) => Promise<void>;
  delete: (key: string) => Promise<void>;
  fetch: <T>(key: string) => Promise<T>;
}