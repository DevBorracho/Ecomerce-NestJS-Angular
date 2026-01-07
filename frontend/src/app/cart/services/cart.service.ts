import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Cart } from '../interfaces/cart.interface';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  cart = signal<Cart>({ items: [], total: 0 });
  cartItems = computed(() => this.cart().items.length);
  getCart() {
    return this.http.get<Cart>(`${environment.API_URL}/cart`, { withCredentials: true });
  }
  addToCart(productId: string, quantity: number = 1) {
    return this.http.post<Cart>(
      `${environment.API_URL}/cart/items`,
      { productId, quantity },
      {
        withCredentials: true,
      }
    );
  }
  updateCantidad(productId: string, quantity: number) {
    return this.http.patch<Cart>(
      `${environment.API_URL}/cart/items/${productId}`,
      { quantity },
      {
        withCredentials: true,
      }
    );
  }
  deleteItem(productId: string) {
    return this.http.delete<Cart>(`${environment.API_URL}/cart/items/${productId}`, {
      withCredentials: true,
    });
  }
  loadCart() {
    this.getCart().subscribe((cart) => {
      this.cart.set(cart);
    });
  }
}
