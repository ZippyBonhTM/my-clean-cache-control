import { LocalSavePurchases } from "@/data/usecases/local-save-purchases.js";
import CacheStoreSpy from "@/moks/cache/cache-store-spy.js";
import { CacheStoreCalls } from "../../moks/cache/cache-store-spy.js";
import type { PurchasesModel } from "@/domain/models/purchases-model.js";
import { describe, expect, test } from "vitest";


function sutFactory() {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return { cacheStore, sut };
}

const mockPurchases: PurchasesModel = [
  { id: '1', title: 'Item A', price: 9.99, quantity: 1, date: new Date('2025-12-10T12:00:00.000Z') },
  { id: '2', title: 'Item B', price: 19.5, quantity: 2, date: new Date('2025-12-09T15:30:00.000Z') },
];


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