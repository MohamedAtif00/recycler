import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  activeTab!:string; // Initialize active tab with the default value

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url.split('/')[1]; // Get the first segment of the URL
        this.activeTab = currentRoute || 'admin'; // Set activeTab to current route or default to 'products'
      }
    });
  }
}
