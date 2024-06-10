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
    private createProduct = `${environment.localhost}Product/AddProduct`
    private updateProduct = `${environment.localhost}Product/UpdateProduct/`


    products = signal<Product[]>([])
    constructor(private _http:HttpClient){
        this.GetProducts(null).subscribe()

    }

    CreateProduct(product:Product)
    {

        return this._http.put<Product>(this.createProduct,product)

    }


    DeleteProduct(id:number)
    {
        return this._http.delete<any>(this.getProducts+'?id='+id);
    }

    GetProducts(categoryId?:number|undefined|null)
    {
        if(categoryId)
            {
               return this._http.get<Product[]>(this.getProducts+'?CategoryId='+categoryId).pipe(
                    map((response)=>{
                        console.log(response);
                        
                        this.products.set(response)
                        return response
                    })
                )
            }
        return this._http.get<Product[]>(this.getProducts).pipe(
            map((response)=>{
                console.log(response);
                
                this.products.set(response)
                return response
            })
        )
    }

    EditProduct(product:Product)
    {
        return this._http.put<any>(this.updateProduct+product.id,product)
    }

}