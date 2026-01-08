import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from 'src/app/orders/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export default class CartComponent implements OnInit {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  cart = this.cartService.cart;
  router = inject(Router);

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cart.set(cart);
    });
  }
  createOrder() {
    this.orderService.createOrder().subscribe((order) => {
      this.router.navigate(['/orders']);
      this.cart.set({ items: [], total: 0 });
    });
  }
  updateCantidad(productId: string, quantity: number) {
    this.cartService.updateCantidad(productId, quantity).subscribe((cart) => {
      this.cart.set(cart);
      this.cartService.loadCart();
    });
  }
  deleteItem(productId: string) {
    this.cartService.deleteItem(productId).subscribe((cart) => {
      this.cart.set(cart);
      this.cartService.loadCart();
    });
  }
}
