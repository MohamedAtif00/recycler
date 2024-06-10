import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/authentcation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private toastr:ToastrService,
              private router:Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.AdminLogin(this.loginForm.value).subscribe(
        (response) => {
          this.toastr.success('Login Success','Success');
          this.router.navigate(['admin','products']);
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
