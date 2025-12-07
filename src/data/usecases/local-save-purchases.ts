import type { CacheStore } from "@/domain/protocols/cache-store.js"
import type { SavePurchases } from "@/domain/usecases/save-purchases.js";

export class LocalSavePurchases implements SavePurchases {
  constructor(private readonly cacheStore: CacheStore) { }

  async save(): Promise<void> {
    await this.cacheStore.delete();
    await this.cacheStore.save();
  };
}