import { LocalLoadPurchases } from "@/data/usecases/local-load-purchases.js";
import { LocalSavePurchases } from "@/data/usecases/local-save-purchases.js";
import CacheStoreSpy from "@tests/moks/cache/cache-store-spy.js";

export default function makePurchasesSut() {
  const cacheStore = new CacheStoreSpy();
  const loadSut = new LocalLoadPurchases(cacheStore);
  const saveSut = new LocalSavePurchases(cacheStore);
  return { cacheStore, loadSut, saveSut };
}