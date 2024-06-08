// translation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import localeEn from '@angular/common/locales/en';

// Factory function for ngx-translate HTTP loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
    current:string = 'en'
  constructor(private translate: TranslateService) {
    // Register locale data
    registerLocaleData(localeAr, 'ar');
    registerLocaleData(localeEn, 'en');


  
    // Set default language
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    // Listen for language changes to update direction
    this.translate.onLangChange.subscribe((event) => {
      this.updateDirection(event.lang);
    });

    // Initial direction update
    this.updateDirection(this.translate.currentLang || this.translate.defaultLang);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.current = language
  }

  private updateDirection(language: string) {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
  }
}
