export interface PurchaseModel {
  id: string;
  title?: string;
  price: string;
  quantity: number;
  date: Date;
};

export type PurchasesModel = PurchaseModel[];