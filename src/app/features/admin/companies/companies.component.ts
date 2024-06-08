import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company.model';
import { CompanyService } from '../services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit{
  
  companies: Company[] = [];
  constructor(private companyServ:CompanyService,private toastr:ToastrService){}

  ngOnInit(): void {
    this.getAllCompanies()
  }

  getAllCompanies()
  {
    this.companyServ.getCompanies().subscribe(data=>{
      this.companies = data
    })
  }

  addCompany()
  {}

  editCompany(company:Company)
  {}

  deleteCompany(email:string)
  {
    this.companyServ.DeleteCompany(email).subscribe(data=>{
      console.log(data);
      this.companies = []
      this.getAllCompanies();
      this.toastr.success('Company successful;ly deleted','Success')
    })  
  }
}
