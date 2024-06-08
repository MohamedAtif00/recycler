import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../../../core/services/translation-loader.service';
import { AuthService } from '../../../core/services/authentcation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  slides = [
    { img:   'https://dashboard.bekia-egypt.com//storage/items_categories/VRvy88AzmfJzE3BxOu7zgAN94Tgl2k0eDyndWX5Z.png', 
    name: 'Sports Equipment' ,
    nameAr:'ادوات رياضية'},
    { img: 'https://dashboard.bekia-egypt.com//storage/items_categories/150ae6811b76cd9917ba7c52429d7b18.png',
     name: 'Kids Toys' },
    { img: 'https://dashboard.bekia-egypt.com//storage/items_categories/LWFCShcrgc1tIINMZlJwRbIfEcSW1lqJtL4Zlo16.png', 
    name: 'Plastic' },
    { img: 'https://dashboard.bekia-egypt.com//storage/items_categories/wZqzAnvQPEd7jrGdHEb5QXh68eLahTPSGF1vVSVt.png', 
    name: 'Paper' },
    { img: 'https://dashboard.bekia-egypt.com//storage/items_categories/DwdOpigjER2YvdFKB04fRzMNpDPNZvzzVcYdMkfZ.png', 
    name: 'Cooking Oil' },
    { img: 'https://dashboard.bekia-egypt.com//storage/items_categories/3IjNxQWhqr2EGuZCutzq3ZX2hR1gpK9D86GOeDah.png',
     name: 'Electronics' },
    { img: 'https://dashboard.bekia-egypt.com//storage/items_categories/CHdJqKaHhDeNMMAIgtFaFciDXFUSY93cjRhpNhr5.png', 
    name: 'Metals' },
    { img: 'https://dashboard.bekia-egypt.com//storage/items_categories/Oy4fLdFmP2yE03Z0s4FnqT81c2NBlEPZgmGuAoKB.png', 
    name: 'Home Appliances' },
    { img: 'https://dashboard.bekia-egypt.com//storage/items_categories/jhdQJEPRCMFVaFJqDgWtZ6GqfgJAJtw9xEAuHHqf.png', 
    name: 'Antiques' },
    { img: 'https://dashboard.bekia-egypt.com//storage/items_categories/Z8fwTzk3aFAgO8AgKjXDV1gjYFH574wvY1BoPT4Z.png', 
    name: 'Spare Parts' }
  ];

  registerForm!: FormGroup;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    arrows: true,  // Show arrows for navigation
    autoplay: true,
    autoplaySpeed: 2000
  };

  constructor(private fb: FormBuilder,private AuthServ:AuthService, private modalService: NgbModal,public translation:TranslationService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  openRegisterModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }

  get displayName() {
    return this.registerForm.get('displayName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get description() {
    return this.registerForm.get('description');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registration successful', this.registerForm.value);
      this.AuthServ.CompanyReegister(this.registerForm.value).subscribe(data=>{
        console.log(data);
        this.AuthServ.stateItem$.subscribe(data=>{})
      })
      // Handle successful registration, e.g., make API call
      this.modalService.dismissAll(this.registerForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
}
