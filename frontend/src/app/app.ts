import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/components/header.component';
import { AuthService } from './auth/services/auth.service';
import { CartService } from './cart/services/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
  authService = inject(AuthService);
  cartService = inject(CartService);
  ngOnInit() {
    this.authService.getMe().subscribe({
      next: (user) => this.authService.user.set(user),
      error: () => this.authService.user.set(null),
    });
    this.cartService.loadCart();
  }
}
