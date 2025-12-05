import { describe, expect, suite, test } from "vitest";
import { } from "vitest/";

class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) { }
}

interface CacheStore {
}

class CacheStoreSpy implements CacheStore {
  saveCallsCount: number = 0;
}


describe('LocalSavePurchases', () => {
  test('Shold not calls any method when initialized sut', () => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore);
    expect(cacheStore.saveCallsCount).toBe(0);
  });
});