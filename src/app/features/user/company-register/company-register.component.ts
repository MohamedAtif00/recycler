import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.css'
})
export class CompanyRegisterComponent {

  joinForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.joinForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      city: ['', Validators.required],
      area: ['', Validators.required],
      zone: ['', Validators.required]
    });
  }

  get fullName() {
    return this.joinForm.get('fullName');
  }

  get phoneNumber() {
    return this.joinForm.get('phoneNumber');
  }

  get city() {
    return this.joinForm.get('city');
  }

  get area() {
    return this.joinForm.get('area');
  }

  get zone() {
    return this.joinForm.get('zone');
  }

  onSubmit() {
    if (this.joinForm.valid) {
      console.log('Form Submitted', this.joinForm.value);
    } else {
      console.log('Form is not valid');
    }
  }




}
