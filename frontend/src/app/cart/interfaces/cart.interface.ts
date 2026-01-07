export interface CartItems {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
}
export interface Cart {
  items: CartItems[];
  total: number;
}
