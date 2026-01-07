import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export default class CartComponent implements OnInit {
  cartService = inject(CartService);
  cart = this.cartService.cart;

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cart.set(cart);
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
