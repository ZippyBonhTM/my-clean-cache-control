import { LocalSavePurchases } from "@/data/usecases/local-save-purchases.js";
import type { PurchasesModel } from "@/domain/models/purchases-model.js";
import type { CacheStore } from "@/domain/protocols/cache-store.js";
import { describe, expect, test } from "vitest";

enum CacheStoreCalls {
  delete,
  save,
}

class CacheStoreSpy implements CacheStore {
  messages: Array<CacheStoreCalls> = [];
  cache: Record<string, any> = {};

  async save(key: string, value: any): Promise<void> {
    this.messages.push(CacheStoreCalls.save);
    this.cache[key] = value;
  }

  async delete(key: string): Promise<void> {
    this.messages.push(CacheStoreCalls.delete);
  }
}

function SutFactory() {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return { cacheStore, sut };
}

const mockPurchases: PurchasesModel = [
  { id: '1', title: 'Item A', price: 9.99, quantity: 1, date: new Date('2025-12-10T12:00:00.000Z') },
  { id: '2', title: 'Item B', price: 19.5, quantity: 2, date: new Date('2025-12-09T15:30:00.000Z') },
];


describe('LocalSavePurchases', () => {
  test('Shold not calls any method when initialized sut', () => {
    const { cacheStore } = SutFactory();
    expect(cacheStore.messages).toEqual([]);
  });

  test('Shold delete before save new cache', async () => {
    const { cacheStore, sut } = SutFactory();
    await sut.save('purchases', mockPurchases);
    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete, CacheStoreCalls.save]);
  });

  test('Shold save the cache in specified key', async () => {
    const { cacheStore, sut } = SutFactory();
    await sut.save('purchases', mockPurchases);
    expect(cacheStore.cache['purchases']).toEqual(mockPurchases);
  });
});