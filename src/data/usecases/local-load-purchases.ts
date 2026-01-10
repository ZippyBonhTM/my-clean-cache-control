import type { CacheStore } from "@/domain/protocols/cache/cache-store.js";
import type { LoadPurchases } from "@/domain/usecases/load-purchases.js";

export class LocalLoadPurchases implements LoadPurchases {
  constructor(private readonly cacheStore: CacheStore) { }

  async load(key: string): Promise<any> {
    return await this.cacheStore.load(key);
  };
}