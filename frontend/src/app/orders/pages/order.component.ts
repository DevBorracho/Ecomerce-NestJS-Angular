import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../interfaces/order.interface';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
})
export default class OrderComponent implements OnInit {
  orderService = inject(OrderService);
  orders = signal<Order[]>([]);
  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders.set(orders);
    });
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.orders.update((orders) => orders.filter((order) => order.id !== id));
    });
  }
}
