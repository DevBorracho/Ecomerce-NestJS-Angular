import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
  router = inject(Router);
  login(email: string, password: string) {
    this.authService.login(email, password).subscribe({
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
        console.error('Login failed:', error);
      },
    });
  }
}
