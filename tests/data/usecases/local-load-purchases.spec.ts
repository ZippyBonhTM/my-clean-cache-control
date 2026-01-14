import { describe, test, expect } from "vitest";
import { CacheStoreCalls } from "@tests/moks/cache/cache-store-spy.js";
import mockPurchases from "@tests/moks/purchases/mockPurchases.js";
import makePurchasesSut from "@tests/factory/data/usecases/makePurchasesSut.js";

describe('LocalLoadPurchases', () => {
  test('Should return null if nothing is in the key', async () => {
    const { cacheStore, loadSut } = makePurchasesSut();

    const result = await loadSut.load('purchases');
    expect(result).toEqual([]);
    expect(cacheStore.messages).toEqual([CacheStoreCalls.load]);
  });

  test('Should throws if fetch fails', async () => {
    const { cacheStore, loadSut } = makePurchasesSut();
    cacheStore.simulateFetchError();

    const sutCall = loadSut.load('purchases');
    expect(sutCall).rejects.toThrow();
    expect(cacheStore.messages).toEqual([]);
  });

  test('Should load correctly', async () => {
    const { cacheStore, loadSut, saveSut } = makePurchasesSut();

    await saveSut.save('purchases', mockPurchases);
    const result = await loadSut.load('purchases');

    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete, CacheStoreCalls.save, CacheStoreCalls.load]);
    expect(result).toEqual(mockPurchases);
  });
});