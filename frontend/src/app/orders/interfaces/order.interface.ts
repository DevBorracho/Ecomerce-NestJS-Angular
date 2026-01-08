export interface Order {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: Date;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    imageURL: string;
  };
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
