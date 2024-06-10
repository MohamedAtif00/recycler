import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BookComponent } from './book/book.component';
import { NgbCarouselModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from '../../core/interceptor/error.interceptor';
import { AuthService } from '../../core/services/authentcation.service';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory, TranslationService } from '../../core/services/translation-loader.service';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WasteComponent } from './waste/waste.component';





@NgModule({
  declarations: [
    HomeComponent,
    BookComponent,
    CompanyRegisterComponent,
    WasteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SlickCarouselModule,
    NgbCarouselModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }) 
  ],
  providers: [
    AuthService,
    TranslationService
  ],
})
export class UserModule {
 }
