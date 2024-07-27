import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private userSubject = new BehaviorSubject<string | null>(this.getUser());
  user$: Observable<string | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh`, { refreshToken });
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setUser(username: string): void {
    localStorage.setItem('username', username);
    this.userSubject.next(username);
  }

  getUser(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
