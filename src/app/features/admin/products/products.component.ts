import { Component, OnInit, computed } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { Product } from '../../../shared/model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{



  products!:Product[];
  constructor(private prodctServ:ProductService){}

  ngOnInit(): void {
    //this.products = this.prodctServ.products()  
    console.log('products',this.prodctServ.products());
    this.loadProducts()
    
  }

  loadProducts(): void {
    this.prodctServ.GetProducts().subscribe(data=>{
        this.products = this.prodctServ.products()
    });
    this.products = this.prodctServ.products()
    console.log('products', this.products);
  }

  editProduct(product:Product)
  {

  } 

  deleteProduct(id:number)
  {}

}
