import { Component, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/authentcation.service';
import { Item } from '../../../shared/model/item.model';
import { Product } from '../../../shared/model/product.model';
import { CartService } from '../../../shared/service/cart.service';
import { ProductService } from '../../../shared/service/product.service';
import { CategoryService } from '../../../shared/service/category.service';
import { Category } from '../../../shared/model/category.model';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrl: './waste.component.css'
})
export class WasteComponent {


  items:Category[]= [
];

constructor(private cartServ:CartService,
            public prodServ:ProductService,
            private authServ:AuthService,
            private toastr:ToastrService,
            public categoryServ:CategoryService){}


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
