import type { PurchasesModel } from "@/domain/models/purchases-model.js";
import { faker } from '@faker-js/faker';

const mockPurchases: PurchasesModel = [
  { id: faker.database.mongodbObjectId(), title: faker.commerce.productName(), price: faker.commerce.price(), quantity: faker.number.int(), date: faker.date.past() },
  { id: faker.database.mongodbObjectId(), title: faker.commerce.productName(), price: faker.commerce.price(), quantity: faker.number.int(), date: faker.date.past() },
];

export default mockPurchases;