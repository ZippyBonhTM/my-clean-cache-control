import { LocalSavePurchases } from "@/data/usecases/local-save-purchases.js";
import CacheStoreSpy from "@tests/moks/cache/cache-store-spy.js";
import { CacheStoreCalls } from "@tests/moks/cache/cache-store-spy.js";
import { mockPurchases } from "@tests/moks/purchases/mockPurchases.js";
import { describe, expect, test } from "vitest";


function sutFactory() {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return { cacheStore, sut };
}

describe('LocalSavePurchases', () => {
  test('Should not calls any method when initialized sut', () => {
    const { cacheStore } = sutFactory();
    expect(cacheStore.messages).toEqual([]);
  });

  test('Should delete before save new cache', async () => {
    const { cacheStore, sut } = sutFactory();
    await sut.save('purchases', mockPurchases);
    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete, CacheStoreCalls.save]);
  });

  test('Should save the cache in specified key', async () => {
    const { cacheStore, sut } = sutFactory();
    await sut.save('purchases', mockPurchases);
    expect(cacheStore.cache['purchases']).toEqual(mockPurchases);
  });

  test('Should not save if sut.delete fails', async () => {
    const { cacheStore, sut } = sutFactory();
    cacheStore.simulateDeleteError();
    const sutCall = sut.save('purchases', mockPurchases);
    await expect(sutCall).rejects.toThrow();
    expect(cacheStore.messages).toEqual([]);
    expect(cacheStore.cache['purchases']).toBeUndefined();
  });

  test('Should not save if sut.save fails', async () => {
    const { cacheStore, sut } = sutFactory();
    cacheStore.simulateSaveError();
    const sutCall = sut.save('purchases', mockPurchases);
    await expect(sutCall).rejects.toThrow();
    expect(cacheStore.cache['purchases']).toBeUndefined();
    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete]);
  });

});