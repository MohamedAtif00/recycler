import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BookComponent } from '../book/book.component';
import { CompanyRegisterComponent } from '../company-register/company-register.component';
import { WasteComponent } from '../waste/waste.component';
import { RoutingCanActivate } from '../../../core/guard/routing.canactivate.guard';


const routes:Routes = [
  {path:'',component:HomeComponent},
  {path:'book',component:BookComponent,canActivate:[RoutingCanActivate]},
  {path:'waste',component:WasteComponent,canActivate:[RoutingCanActivate]},
  {path:'company-register',component:CompanyRegisterComponent,canActivate:[RoutingCanActivate]}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],exports:[RouterModule]
})
export class UserRoutingModule { }
