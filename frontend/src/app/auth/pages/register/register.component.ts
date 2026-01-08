import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  constructor() {}
  authService = inject(AuthService);
  router = inject(Router);
  cartService = inject(CartService);

  register(username: string, email: string, password: string) {
    this.authService.register({ username, email, password }).subscribe({
      next: (user) => {
        this.authService.user.set(user);
        this.router.navigate(['/products']);
        this.cartService.loadCart();
        this.authService.getMe().subscribe({
          next: (user) => {
            this.authService.user.set(user);
          },
          error: (error) => {
            console.error('Get me failed:', error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
