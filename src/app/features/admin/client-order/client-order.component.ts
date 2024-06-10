import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  street: string;
}

interface OrderItem {
  productId: number;
  productName: string;
  pictureURL: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  buyerEmail: string;
  orderDate: string;
  status: string;
  shippingAddress: ShippingAddress;
  deliveryMethod: string;
  deliveryMethodCost: number;
  items: OrderItem[];
  subTotal: number;
  total: number;
}




@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrl: './client-order.component.css'
})
export class ClientOrderComponent implements OnInit{

  orders: Order[] = [
    {
      id: 1,
      buyerEmail: 'buyer1@example.com',
      orderDate: '2024-06-10T04:58:50.071Z',
      status: 'Processing',
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        city: 'City1',
        country: 'Country1',
        street: 'Street1'
      },
      deliveryMethod: 'Standard',
      deliveryMethodCost: 5,
      items: [
        {
          productId: 101,
          productName: 'Product 1',
          pictureURL: 'https://example.com/product1.jpg',
          price: 10,
          quantity: 2
        },
        {
          productId: 102,
          productName: 'Product 2',
          pictureURL: 'https://example.com/product2.jpg',
          price: 20,
          quantity: 1
        }
      ],
      subTotal: 40,
      total: 45
    },
    // Add more orders as needed
  ];



  constructor(private client:ClientService){}


  ngOnInit(): void {
    this.client.GetClientsOrders().subscribe(data=>{
      console.log(data);
      if(data.length !=0)
      this.orders = data
    })
  }




}
