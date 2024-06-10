import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BookComponent } from '../book/book.component';
import { CompanyRegisterComponent } from '../company-register/company-register.component';
import { WasteComponent } from '../waste/waste.component';


const routes:Routes = [
  {path:'',component:HomeComponent},
  {path:'book',component:BookComponent},
  {path:'waste',component:WasteComponent},
  {path:'company-register',component:CompanyRegisterComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],exports:[RouterModule]
})
export class UserRoutingModule { }
