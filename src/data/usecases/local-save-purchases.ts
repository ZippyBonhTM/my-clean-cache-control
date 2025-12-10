import type { PurchasesModel } from "@/domain/models/purchases-model.js";
import type { CacheStore } from "@/domain/protocols/cache-store.js"
import type { SavePurchases } from "@/domain/usecases/save-purchases.js";

export class LocalSavePurchases implements SavePurchases {
  constructor(private readonly cacheStore: CacheStore) { }

  async save(key: string, value: PurchasesModel): Promise<void> {
    await this.cacheStore.delete(key);
    await this.cacheStore.save(key, value);
  };
}