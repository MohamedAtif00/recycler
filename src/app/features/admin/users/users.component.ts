import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../model/client.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  clients!:Client[];
  constructor(private clientServ:ClientService){}

  ngOnInit(): void {
     this.getAllClients();
  }

  getAllClients()
  {
    this.clientServ.GetAllClients().subscribe(data=>{
      this.clients = data
    })
  }

  addClient()
  {}

  editClient(client:Client)
  {}

  deleteClient(email:string)
  {
    this.clientServ.DeleteClient(email).subscribe(data=>{
      this.getAllClients()
    });
  } 
}
