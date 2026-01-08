import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  user = signal<User | null>(null);

  getMe() {
    return this.httpClient.get<User>(`${environment.API_URL}/users/profile`, {
      withCredentials: true,
    });
  }

  register(email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.API_URL}/auth/register`,
      { email, password },
      { withCredentials: true }
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
  }
  logout() {
    return this.httpClient.post(
      `${environment.API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }
}
