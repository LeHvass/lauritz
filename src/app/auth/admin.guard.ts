import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log("guard");

      if (this.authService.isLoggedIn && this.authService.isAdmin) {
        console.log('admin accessing admin only page');
        return true; // Allowed access
      }

      
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/home/login']);
      console.log('non-admin accessing admin only page');
      return false; // Not allowed access.
  }
  
}
