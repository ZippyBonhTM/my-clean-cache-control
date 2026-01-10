import CacheStoreSpy from "@tests/moks/cache/cache-store-spy.js";
import { test, describe, expect } from "vitest";
import { LocalLoadPurchases } from "@/data/usecases/local-load-purchases.js";


describe('LocalLoadPurchases', () => {
  test('Should return null if nothing is in the key', async () => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalLoadPurchases(cacheStore);

    const result = await sut.load('purchases');
    expect(result).toBeNull();
  })
});