import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recycler';


  constructor(private router:Router){}

  @HostListener('window:popstate',['$event'])
  onPopState(event:Event)
  {
    event.preventDefault();
    this.router.navigate(['']);
  }

}
