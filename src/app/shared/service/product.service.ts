import { Injectable, signal } from "@angular/core";
import { environment } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "../model/product.model";
import { Item } from "../model/item.model";
import { map } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class    ProductService{

    private getProducts = `${environment.localhost}Product`


    products = signal<Product[]>([])
    constructor(private _http:HttpClient){
        this.GetProducts()

    }

    GetProducts()
    {
        return this._http.get<Product[]>(this.getProducts).pipe(
            map((response)=>{
                console.log(response);
                
                this.products.set(response)
                return response
            })
        )
    }

}