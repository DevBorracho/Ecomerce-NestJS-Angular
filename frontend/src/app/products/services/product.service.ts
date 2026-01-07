import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  products = signal<Product[]>([]);

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.API_URL}/products`);
  }

  getProductsByName(name: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.API_URL}/products`, {
      params: {
        name,
      },
    });
  }
}
