import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
})
export default class ProductComponent implements OnInit {
  productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  cartService = inject(CartService);
  products = this.productService.products;
  addToCart(productId: string, quantity: number = 1) {
    this.cartService.addToCart(productId, quantity).subscribe(() => {
      this.cartService.loadCart();
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const search = params['search'];

      if (search) {
        // Buscar productos
        this.productService.getProductsByName(search).subscribe((products) => {
          this.products.set(products);
        });
      } else {
        // Traer TODOS los productos
        this.productService.getProducts().subscribe((products) => {
          this.products.set(products);
        });
      }
    });
  }
}
