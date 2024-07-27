import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const isLoginOrRegister = ['/login', '/register'].includes(state.url);

    if (isAuthenticated) {
      if (isLoginOrRegister) {
        this.router.navigate(['/articles']);
        return false;
      }
      return true;
    } else {
      if (!isLoginOrRegister) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
}
