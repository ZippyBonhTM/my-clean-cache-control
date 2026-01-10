export interface CacheStore {
  save: (key: string, value: any) => Promise<void>;
  delete: (key: string) => Promise<void>;
  load: (key: string) => Promise<any>;
}