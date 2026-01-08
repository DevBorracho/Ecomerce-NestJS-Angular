import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Order } from '../interfaces/order.interface';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>(`${environment.API_URL}/order`, {
      withCredentials: true,
    });
  }
  createOrder() {
    return this.http.post<Order>(
      `${environment.API_URL}/order`,
      {},
      {
        withCredentials: true,
      }
    );
  }
  deleteOrder(id: string) {
    return this.http.delete(`${environment.API_URL}/order/${id}`, {
      withCredentials: true,
    });
  }
  paymentOrder(orderId: string) {
    return this.http.post<{ url: string }>(
      `${environment.API_URL}/payments/checkout`,
      { orderId },
      {
        withCredentials: true,
      }
    );
  }
}
