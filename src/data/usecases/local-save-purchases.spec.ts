import { describe, expect, test } from "vitest";

class LocalSavePurchases implements SavePurchases {
  constructor(private readonly cacheStore: CacheStore) { }

  async save(): Promise<void> {
    await this.cacheStore.delete();
    await this.cacheStore.save();
  };
}

interface SavePurchases {
  save: () => Promise<void>;
}

interface CacheStore {
  save: () => Promise<void>;
  delete: () => Promise<void>;
}

class CacheStoreSpy implements CacheStore {
  saveCallsCount: number = 0;
  deleteCallsCount: number = 0;

  async save(): Promise<void> {
    this.saveCallsCount++;
  }

  async delete(): Promise<void> {
    this.deleteCallsCount++;
  }
}


describe('LocalSavePurchases', () => {
  test('Shold not calls any method when initialized sut', () => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore);
    expect(cacheStore.saveCallsCount).toBe(0);
  });

  test('Showd delete before save new cache', async () => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore);

    await sut.save();
    expect(cacheStore.saveCallsCount).toBe(1);
    expect(cacheStore.deleteCallsCount).toBe(1);
  });
});