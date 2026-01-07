import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'headerComponent',
  imports: [RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  authService = inject(AuthService);
  productService = inject(ProductService);
  cartService = inject(CartService);

  router = inject(Router);
  user = this.authService.user;
  products = this.productService.products;
  cart = this.cartService.cart;
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  searchProducts(name: string) {
    this.router.navigate(['/products'], {
      queryParams: { search: name },
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.user.set(null);

      this.cartService.cart.set({
        items: [],
        total: 0,
      });

      this.router.navigate(['/login']);
    });
  }
}
