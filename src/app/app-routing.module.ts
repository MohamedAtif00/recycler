import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./features/user/user.module').then(c =>c.UserModule)},
  {path:'admin',loadChildren:()=>import('./features/admin/admin.module').then(x =>x.AdminModule)},

  {path:'**',redirectTo:''}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
