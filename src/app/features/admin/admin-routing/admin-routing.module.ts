import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';
import { CategoryComponent } from '../category/category.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AdminAuthGuard } from '../../../core/guard/admin.canactivate.guard';
import { UsersComponent } from '../users/users.component';
import { CompaniesComponent } from '../companies/companies.component';
import { ClientOrderComponent } from '../client-order/client-order.component';
import { CompanyOrderComponent } from '../company-order/company-order.component';

const routes:Routes = [
  {path:'',component:HomeComponent,children:[
    {path:'products',component:ProductsComponent},
    {path:'category',component:CategoryComponent},
    {path:'users',component:UsersComponent},
    {path:'companies',component:CompaniesComponent},
    {path:'clients-orders',component:ClientOrderComponent},
    {path:'companies-orders',component:CompanyOrderComponent},
  ],
  canActivate:[AdminAuthGuard]},

  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
] 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
