import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: any;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.getToken();

    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !this.isRefreshing
        ) {
          this.isRefreshing = true;
          this.refreshTokenSubject = new Observable<any>();

          return this.authService
            .refreshToken(this.authService.getToken() || '')
            .pipe(
              switchMap((response: any) => {
                this.isRefreshing = false;
                this.authService.setToken(response.access_token);
                return next.handle(this.addToken(req, response.access_token));
              }),
              catchError((err) => {
                this.isRefreshing = false;
                this.authService.logout();
                return throwError(err);
              })
            );
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
