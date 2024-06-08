import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Cart } from '../../../shared/model/cart.model';
import { Product } from '../../../shared/model/product.model';
import { CartService } from '../../../shared/service/cart.service';
import { ProductService } from '../../../shared/service/product.service';
import { Item } from '../../../shared/model/item.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{



   items= [
    { id: 0, productName: 'Chair', pictureUrl: 'https://dashboard.bekia-egypt.com//storage/items/eCmzdy4YI1bjs4GRg7ORHnZ25evL0UOhwYspXKXa.png', category: 'piece', price: 380, quantity: 0 },
    { id: 1, productName: 'Plastics', pictureUrl: 'https://dashboard.bekia-egypt.com//storage/items/Ghk5ylX4gtpHQjax7M1n5dvGf1VZGXwKkKcWkVR1.png', category: 'kg', price: 190, quantity: 0 },
    { id: 2, productName: 'Coleman Water', pictureUrl: 'https://dashboard.bekia-egypt.com//storage/items/ZKrQHf68q4Qt06T6Ok4MIfKAlNQQTthMaDtY20Ms.png', category: 'piece', price: 285, quantity: 0 },
    { id: 3, productName: 'Plastic Barrel', pictureUrl: 'https://dashboard.bekia-egypt.com//storage/items/dW0WRAD5XbEgr2SYPWUEinXvQidnjYHdYtvJP6uJ.png', category: 'piece', price: 950, quantity: 0 },
    { id: 4, productName: 'Acrylic', pictureUrl: 'https://dashboard.bekia-egypt.com//storage/items/95df0632cb4f5ed4a30133a2e2b07818.png', category: 'kg', price: 285, quantity: 0 },
    { id: 5, productName: 'Solid Plastic', pictureUrl: 'https://dashboard.bekia-egypt.com//storage/items/ba0d59426216fc0fd61dee2d5f553125.png', category: 'kg', price: 19, quantity: 0 }
];

constructor(private cartServ:CartService,public prodServ:ProductService){}


  // slideConfig = {
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   dots: true,
  //   infinite: true,
  //   arrows: true,  // Show arrows for navigation
  //   autoplay: true,
  //   autoplaySpeed: 2000
  // };

  ngOnInit(): void {
    this.prodServ.GetProducts().subscribe()
    this.prodServ.products
  }



  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  AddToCart(product:Product)
  {
    let item:Item  ={id:product.id,
                     productName:product.name,
                     pictureUrl:product.pictureUrl,
                     category:product.category,
                     price:product.price,
                     quantity:1} 
    this.cartServ.addProduct(item)
  } 

  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }

}
