import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/authentcation.service';


@Injectable({
  providedIn: 'root'
})
export class RoutingCanActivate implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
      const navigation = this.router.getCurrentNavigation();
      if(navigation?.extras.state && navigation.extras.state['data'])
        {
            return true; // User is authenticated and has admin role
        }else{
             this.router.navigate(['']);
             return false
        }

    
  }
}
