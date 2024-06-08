import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/authentcation.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      leverages: ['Admin'],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator()]]
    });
  }

  passwordValidator(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      if (!/(?=.*[A-Za-z])(?=.*[\W_]).{8,}/.test(value)) {
        return { 'invalidPassword': true };
      }
      return null;
    };
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.AdminRegister(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registration successful', response);
          // Add any further logic, such as redirecting to a different page
        },
        (error) => {
          console.error('Registration failed', error);
          if (error.status === 400) {
            this.errorMessage = 'Invalid registration data. Please check your input.';
          } else {
            this.errorMessage = 'An error occurred during registration. Please try again later.';
          }
        }
      );
    }
  }
  
}
