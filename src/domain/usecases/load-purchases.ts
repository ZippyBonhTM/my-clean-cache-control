import type { PurchasesModel } from "../models/purchases-model.js";

export interface LoadPurchases {
  load: (key: string) => Promise<PurchasesModel>;
}