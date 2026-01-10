import type { PurchasesModel } from "../models/purchases-model.js";

export interface SavePurchases {
  save: (key: string, value: PurchasesModel) => Promise<void>;
}