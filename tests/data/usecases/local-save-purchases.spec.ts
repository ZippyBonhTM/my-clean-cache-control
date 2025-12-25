import { LocalSavePurchases } from "@/data/usecases/local-save-purchases.js";
import type { PurchasesModel } from "@/domain/models/purchases-model.js";
import type { CacheStore } from "@/domain/protocols/cache/cache-store.js";
import { describe, expect, test, vi } from "vitest";

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

  simulateDeleteError(): void {
    vi.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => { throw new Error() });
  }

  simulateSaveError(): void {
    vi.spyOn(CacheStoreSpy.prototype, 'save').mockImplementationOnce(() => { throw new Error() });
  }
}

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
  test('Shold not calls any method when initialized sut', () => {
    const { cacheStore } = sutFactory();
    expect(cacheStore.messages).toEqual([]);
  });

  test('Shold delete before save new cache', async () => {
    const { cacheStore, sut } = sutFactory();
    await sut.save('purchases', mockPurchases);
    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete, CacheStoreCalls.save]);
  });

  test('Shold save the cache in specified key', async () => {
    const { cacheStore, sut } = sutFactory();
    await sut.save('purchases', mockPurchases);
    expect(cacheStore.cache['purchases']).toEqual(mockPurchases);
  });

  test('Shold not save if sut.delete fails', async () => {
    const { cacheStore, sut } = sutFactory();
    cacheStore.simulateDeleteError();
    const sutCall = sut.save('purchases', mockPurchases);
    await expect(sutCall).rejects.toThrow();
    expect(cacheStore.messages).toEqual([]);
    expect
  });

  test('Shold not save if sut.save fails', async () => {
    const { cacheStore, sut } = sutFactory();
    cacheStore.simulateSaveError();
    const sutCall = sut.save('purchases', mockPurchases);
    await expect(sutCall).rejects.toThrow();
    expect(cacheStore.cache['purchases']).toBeUndefined();
    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete]);
  });
});