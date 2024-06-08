import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private getAllCompanies:string = `${environment.localhost}Account/AllCompanies`
  private deleteCompany:string = `${environment.localhost}Account/Company?email=`

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.getAllCompanies);
  }

//   addCompany(company: Company): Observable<Company> {
//     return this.http.post<Company>(this.apiUrl, company);
//   }

//   updateCompany(company: Company): Observable<Company> {
//     return this.http.put<Company>(`${this.apiUrl}/${company.email}`, company);
//   }

  DeleteCompany(email: string): Observable<void> {
    return this.http.delete<void>(`${this.deleteCompany}${email}`);
  }
}
