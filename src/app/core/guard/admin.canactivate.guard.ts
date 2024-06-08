import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authentcation.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      console.log(this.authService.isAdmin());
      
      return true; // User is authenticated and has admin role
    } else {
      this.router.navigate(['admin/login']); // Redirect to login page if not authenticated or not admin
      return false;
    }
  }
}
