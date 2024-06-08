import { Component, ElementRef, HostListener, OnInit, Renderer2, TemplateRef, ViewChild, computed, viewChild } from '@angular/core';
import { IAuthInfo } from '../../core/model/user.model';
import { AuthService } from '../../core/services/authentcation.service';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from '../../core/model/request/register.model';
import { LoginRequest } from '../../core/model/request/login.model';
import { CartService } from '../../shared/service/cart.service';
import { Product } from '../../shared/model/product.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation-loader.service';
import { Item } from '../../shared/model/item.model';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../../shared/model/order.model';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  
})
export class HeaderComponent implements OnInit{

  authUser!: IAuthInfo | null;
  registerForm!:FormGroup;
  loginForm!: FormGroup;
  companyLoginForm!:FormGroup;
  addressForm!:FormGroup;
  passwordVisible: boolean = false;
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  @ViewChild('address') address! :TemplateRef<any>;


  currentLang!: string;
  //totalOrders:number = computed();
  constructor(public authService: AuthService,
              private modalServ:NgbModal,
              private fb:FormBuilder,
              public cartServ:CartService,
              private elementRef: ElementRef,
              private translationService:TranslationService,
              private renderer: Renderer2,
              public dialog:MatDialog,
              private authServ:AuthService,
              private toaster:ToastrService) 
              {
                this.currentLang = 'en'; // default
              }

              switchLanguage(selectElement: HTMLSelectElement) {
                if(selectElement.value)
                  {
                    this.translationService.switchLanguage(selectElement.value);
                    this.currentLang = selectElement.value;

                  }
                
              }

              updateDirection(language: string) {
                const direction = language === 'ar' ? 'rtl' : 'ltr';
                this.renderer.setAttribute(document.documentElement, 'dir', direction);
              }

  slides = [
    { name: 'Sports Equipment' },
    { name: 'Kids Toys' },
    { name: 'Plastic' },
    { name: 'Paper' },
    { name: 'Cooking Oil' },
    { name: 'Electronics' },
    { name: 'Metals' },
    { name: 'Home Appliances' },
    { name: 'Antiques' },
    { name: 'Spare Parts' }
  ];
  
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
    // Set initial language from the translation service
    this.currentLang = this.translationService['translate'].currentLang || this.translationService['translate'].defaultLang;
    //this.totalItemsInCart = this.cartServ.cart().products.length
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.companyLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group(
      {
        FullName:['',Validators.required],
        Email:['',Validators.required],
        RecyclingPreferences:['',Validators.required],
        PhoneNumber:['',Validators.required],
        Password:['',Validators.required]
      }
    )

    this.addressForm = this.fb.group({
      deliveryMethodId: ['', Validators.required],
      shipAddress: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  



    this.authService.stateItem$.subscribe(data => {
      this.authUser = data;
      if (this.authUser) {
        console.log(this.authUser.displayName); // Assuming you want to log the displayName
      }
    });
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const clickedInsideIcon = this.elementRef.nativeElement.querySelector('.img-fluid') === event.target ;
    const btn =  this.elementRef.nativeElement.querySelector('.bi') === event.target

    if (!this.isInsideBasket(event.target) && !clickedInsideIcon && !btn) {
      this.closeBasketDrawer();
    }
  }
  onCancel(): void {
    this.modalServ.dismissAll();
  }

  isInsideBasket(target: any): boolean {
    // Check if the target element or any of its parents is inside the basket drawer
    let element = target;
    while (element) {
      if (element.classList && element.classList.contains('basket-drawer')) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }

  closeBasketDrawer() {
    this.isOpen = false;
  }


  openDialog(address: TemplateRef<any>,login:TemplateRef<any>): void {
    
    this.authServ.stateItem$.subscribe(data=>{
      if(data != null)
        {
          this.modalServ.open(address, { centered: true, windowClass: 'custom-animation' });

        }else{
          this.toaster.info('Please Login First','warning');
          this.modalServ.open(login, { centered: true, windowClass: 'custom-animation' });
        }


    })
    

  }
  
  increaseQuantity(product: Item) {
    this.cartServ.addProduct(product);
  }

  decreaseQuantity(productName: string) {
    this.cartServ.removeProduct(productName);
  }

  removeProduct(productName: string) {
    this.cartServ.removeWholeProduct(productName)
  }

  

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      let request:RegisterRequest = {displayName:this.fullName?.value,
                                     email:this.email?.value,
                                     recyclingPreferences:this.recyclingPreferences?.value,
                                     phoneNumber:this.phoneNumber?.value,
                                     password:this.password?.value}
      this.authService.register(request).subscribe(
        (response) => {
          console.log('Registration successful', response);
          // Handle successful registration, e.g., update UI, close modal, etc.
          this.modalServ.dismissAll();
        },
        (error) => {
          console.error('Registration failed', error);
          // Handle registration error, e.g., show error message
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }



  


  RegisterOpen(content: TemplateRef<any>) {
		this.modalServ.open(content, { centered: true,windowClass:'custom-animation' });
	}
  
  open(content: TemplateRef<any>) {
    this.modalServ.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }



  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.getElementById('login-password') as HTMLInputElement;
    passwordField.type = this.passwordVisible ? 'text' : 'password';
  }


  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      let request:LoginRequest = this.loginForm.value
      this.authService.login(request).subscribe(
        (response) => {
          console.log('Login successful', response);
          // Handle successful registration, e.g., update UI, close modal, etc.
          this.modalServ.dismissAll();
        },
        (error) => {
          console.error('Login failed', error);
          // Handle registration error, e.g., show error message
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  CompanyLoginSubmit()
  {
    if (this.companyLoginForm.valid) {
      let request:LoginRequest = this.companyLoginForm.value
      this.authService.login(request).subscribe(
        (response) => {
          console.log('Login successful', response);
          // Handle successful registration, e.g., update UI, close modal, etc.
          this.modalServ.dismissAll();
        },
        (error) => {
          console.error('Login failed', error);
          // Handle registration error, e.g., show error message
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }


  forgotPassword(): void {
    // Handle forgot password logic
  }

  removePlaceholder(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    selectElement.classList.remove('placeholder');
  }

  CreateOrder()
  {
    this.cartServ.CreateOrder(this.addressForm.value.shipAddress, this.addressForm.value.deliveryMethodId).pipe(
      catchError(error => {
          // console.error('Error creating order:', error);
          // Display an error message to the user (e.g., using ToastrService)
          // this.toaster.error('Failed to create order. Please try again.', 'Order Error');
          this.cartServ.emptyCart();
          // this.modalServ.open(this.address, { centered: true, windowClass: 'custom-animation' });
          this.modalServ.dismissAll(this.address);
          // Return an empty observable or a default value to keep the observable chain alive
          return of(null);
      })
  ).subscribe(data => {
      if (data) {
          console.log(data);
          this.cartServ.emptyCart();
          // this.modalServ.open(this.address, { centered: true, windowClass: 'custom-animation' });
          this.modalServ.dismissAll(this.address);
      }
  });
  
    this.toaster.success('Order has made successfully ','success');
  }





  get fullName() {
    return this.registerForm.get('FullName');
  }

  get email() {
    return this.registerForm.get('Email');
  }

  get recyclingPreferences() {
    return this.registerForm.get('RecyclingPreferences');
  }

  get phoneNumber() {
    return this.registerForm.get('PhoneNumber');
  }

  get password() {
    return this.registerForm.get('Password');
  }


}
