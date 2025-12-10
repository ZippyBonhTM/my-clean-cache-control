export interface SavePurchases {
  save: (key: string, value: any) => Promise<void>;
}