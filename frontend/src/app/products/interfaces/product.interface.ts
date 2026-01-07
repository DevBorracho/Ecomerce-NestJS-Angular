import { Category } from './category.interface';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageURL?: string;
  categories: Category[];
  createdAt: Date;
}
