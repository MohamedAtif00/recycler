import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/authentcation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.AdminLogin(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful', response);
          // Add any further logic, such as redirecting to a different page
        },
        (error) => {
          console.error('Login failed', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password. Please try again.';
          } else {
            this.errorMessage = 'An error occurred during login. Please try again later.';
          }
        }
      );
    }
  }
  
}
