import CacheStoreSpy,{ CacheStoreCalls }  from "@tests/moks/cache/cache-store-spy.js";
import { test, describe, expect } from "vitest";
import { LocalLoadPurchases } from "@/data/usecases/local-load-purchases.js";
import { LocalSavePurchases } from "@/data/usecases/local-save-purchases.js";
import type { PurchasesModel } from "@/domain/models/purchases-model.js";

const mockPurchases: PurchasesModel = [
  { id: '1', title: 'Item A', price: 9.99, quantity: 1, date: new Date('2025-12-10T12:00:00.000Z') },
  { id: '2', title: 'Item B', price: 19.5, quantity: 2, date: new Date('2025-12-09T15:30:00.000Z') },
];

describe('LocalLoadPurchases', () => {
  test('Should return null if nothing is in the key', async () => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalLoadPurchases(cacheStore);

    const result = await sut.load('purchases');
    expect(result).toEqual([]);
  });

  test('Should throws if fetch fails', async () => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalLoadPurchases(cacheStore);
    cacheStore.simulateFetchError();

    const sutCall = sut.load('purchases');
    expect(sutCall).rejects.toThrow();
    expect(cacheStore.messages).toEqual([]);
  });

  test('Should load correctly', async () => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalLoadPurchases(cacheStore);
    const localSavePurchases = new LocalSavePurchases(cacheStore);
    
    await localSavePurchases.save('purchases', mockPurchases);
    const result = await sut.load('purchases');

    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete, CacheStoreCalls.save, CacheStoreCalls.load]);
    expect(result).toEqual(mockPurchases);
  })
});