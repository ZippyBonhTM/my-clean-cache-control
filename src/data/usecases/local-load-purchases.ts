import type { PurchasesModel } from "@/domain/models/purchases-model.js";
import type { CacheStore } from "@/domain/protocols/cache/cache-store.js";
import type { LoadPurchases } from "@/domain/usecases/load-purchases.js";

export class LocalLoadPurchases implements LoadPurchases {
  constructor(private readonly cacheStore: CacheStore) { }

  async load(key: string): Promise<PurchasesModel | null> {
    return await this.cacheStore.fetch<PurchasesModel>(key);
  };
}