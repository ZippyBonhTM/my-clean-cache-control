import makePurchasesSut from "@tests/factory/data/usecases/makePurchasesSut.js";
import { CacheStoreCalls } from "@tests/moks/cache/cache-store-spy.js";
import { mockPurchases } from "@tests/moks/purchases/mockPurchases.js";
import { describe, expect, test } from "vitest";

describe('LocalSavePurchases', () => {
  test('Should not calls any method when initialized savesut', () => {
    const { cacheStore } = makePurchasesSut();
    expect(cacheStore.messages).toEqual([]);
  });

  test('Should delete before save new cache', async () => {
    const { cacheStore, saveSut } = makePurchasesSut();
    await saveSut.save('purchases', mockPurchases);
    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete, CacheStoreCalls.save]);
  });

  test('Should save the cache in specified key', async () => {
    const { cacheStore, saveSut } = makePurchasesSut();
    await saveSut.save('purchases', mockPurchases);
    expect(cacheStore.cache['purchases']).toEqual(mockPurchases);
  });

  test('Should not save if savesut.delete fails', async () => {
    const { cacheStore, saveSut } = makePurchasesSut();
    cacheStore.simulateDeleteError();
    const savesutCall = saveSut.save('purchases', mockPurchases);
    await expect(savesutCall).rejects.toThrow();
    expect(cacheStore.messages).toEqual([]);
    expect(cacheStore.cache['purchases']).toBeUndefined();
  });

  test('Should not save if savesut.save fails', async () => {
    const { cacheStore, saveSut } = makePurchasesSut();
    cacheStore.simulateSaveError();
    const savesutCall = saveSut.save('purchases', mockPurchases);
    await expect(savesutCall).rejects.toThrow();
    expect(cacheStore.cache['purchases']).toBeUndefined();
    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete]);
  });

});