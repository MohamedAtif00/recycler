// src/app/core/interceptors/error.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentcation.service';

@Injectable(
  {
    providedIn:'root'
  }
)
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server-side error: ${error.status} - ${error.message}`;
          
          // Handle specific status codes (e.g., 401 Unauthorized)
          if (error.status === 401) {
            // Optionally log the user out and navigate to login page
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }

        // Optionally display error message using a service or a component
        console.error(errorMessage);
        
        // Return an observable with a user-facing error message
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
