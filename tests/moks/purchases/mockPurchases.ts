import type { PurchasesModel } from "@/domain/models/purchases-model.js";

export const mockPurchases: PurchasesModel = [
  { id: '1', title: 'Item A', price: 9.99, quantity: 1, date: new Date('2025-12-10T12:00:00.000Z') },
  { id: '2', title: 'Item B', price: 19.5, quantity: 2, date: new Date('2025-12-09T15:30:00.000Z') },
];