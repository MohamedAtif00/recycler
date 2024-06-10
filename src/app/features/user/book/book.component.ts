import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Cart } from '../../../shared/model/cart.model';
import { Product } from '../../../shared/model/product.model';
import { CartService } from '../../../shared/service/cart.service';
import { ProductService } from '../../../shared/service/product.service';
import { Item } from '../../../shared/model/item.model';
import { AuthService } from '../../../core/services/authentcation.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../shared/service/category.service';
import { Category } from '../../../shared/model/category.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{



   items:Category[]= [];

constructor(private cartServ:CartService,
            public prodServ:ProductService,
            private authServ:AuthService,
            private toastr:ToastrService,
            private categoryServ:CategoryService){}


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
    this.categoryServ.GetAllCategories().subscribe(data=>{
      this.items = data
    })
    this.prodServ.GetProducts(null).subscribe()
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
    if(!this.authServ.isAuthenticated())
      {
        this.toastr.info('Please Login First','Waring')
      }else
      {
        let item:Item  ={id:product.id,
                         productName:product.name,
                         pictureUrl:product.pictureUrl,
                         category:product.category,
                         price:product.price,
                         quantity:1} 
        this.cartServ.addProduct(item)

      }
  } 

  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }

  GetProducts(id:number)
  {
    this.prodServ.GetProducts(id).subscribe(data=>{
      console.log(data);
      
    });
  }

}
