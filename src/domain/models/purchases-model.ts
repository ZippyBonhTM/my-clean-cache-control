export interface PurchaseModel {
  id: string;
  title?: string;
  price: number;
  quantity: number;
  date: Date;
};

export type PurchasesModel = PurchaseModel[];