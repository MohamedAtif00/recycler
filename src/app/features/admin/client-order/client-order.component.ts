import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrl: './client-order.component.css'
})
export class ClientOrderComponent implements OnInit{

  constructor(private client:ClientService){}


  ngOnInit(): void {
    this.client.GetClientsOrders().subscribe(data=>{
      console.log(data);
      
    })
  }

}
