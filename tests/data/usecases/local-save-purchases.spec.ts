import { LocalSavePurchases } from "@/data/usecases/local-save-purchases.js";
import type { CacheStore } from "@/domain/protocols/cache-store.js";
import { describe, expect, test } from "vitest";

enum CacheStoreCalls {
  delete,
  save,
}

class CacheStoreSpy implements CacheStore {
  messages: Array<CacheStoreCalls> = [];

  async save(): Promise<void> {
    this.messages.push(CacheStoreCalls.save);
  }

  async delete(): Promise<void> {
    this.messages.push(CacheStoreCalls.delete);
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
    expect(cacheStore.messages).toEqual([]);
  });

  test('Shold delete before save new cache', async () => {
    const { cacheStore, sut } = SutFactory();
    await sut.save();
    expect(cacheStore.messages).toEqual([CacheStoreCalls.delete, CacheStoreCalls.save]);
  });
});