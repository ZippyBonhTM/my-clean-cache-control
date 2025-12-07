import { LocalSavePurchases } from "@/data/usecases/local-save-purchases.js";
import type { CacheStore } from "@/domain/protocols/cache-store.js";
import { describe, expect, test } from "vitest";

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

function SutFactory() {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return { cacheStore, sut };
}


describe('LocalSavePurchases', () => {
  test('Shold not calls any method when initialized sut', () => {
    const { cacheStore } = SutFactory();
    expect(cacheStore.saveCallsCount).toBe(0);
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test('Shold delete before save new cache', async () => {
    const { cacheStore, sut } = SutFactory();
    await sut.save();
    expect(cacheStore.saveCallsCount).toBe(1);
    expect(cacheStore.deleteCallsCount).toBe(1);
  });
});