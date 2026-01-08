import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/pages/register/register.component'),
  },
  {
    path: 'products',
    loadComponent: () => import('./products/pages/product.component'),
  },
  { path: 'cart', loadComponent: () => import('./cart/pages/cart.component') },
  { path: 'orders', loadComponent: () => import('./orders/pages/order.component') },
  { path: '**', redirectTo: 'products' },
];
