import type { CacheStore } from "@/domain/protocols/cache/cache-store.js";
import { vi } from "vitest";

export enum CacheStoreCalls {
  delete,
  save,
  load,
}

export default class CacheStoreSpy implements CacheStore {
  messages: Array<CacheStoreCalls> = [];
  cache: Record<string, any> = {};

  async save(key: string, value: any): Promise<void> {
    this.messages.push(CacheStoreCalls.save);
    this.cache[key] = value;
  }

  async delete(key: string): Promise<void> {
    this.messages.push(CacheStoreCalls.delete);
  }

  async fetch(key: string): Promise<any> {
    this.messages.push(CacheStoreCalls.load);
    return this.cache[key] ? this.cache[key] : null;
  }

  simulateDeleteError(): void {
    vi.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => { throw new Error(); });
  }

  simulateSaveError(): void {
    vi.spyOn(CacheStoreSpy.prototype, 'save').mockImplementationOnce(() => { throw new Error(); });
  }
}