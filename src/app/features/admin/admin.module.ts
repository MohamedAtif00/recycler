import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../core/interceptor/auth.interceptor';
import { ClientOrderComponent } from './client-order/client-order.component';
import { CompanyOrderComponent } from './company-order/company-order.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    CompaniesComponent,
    ClientOrderComponent,
    CompanyOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class AdminModule { }
