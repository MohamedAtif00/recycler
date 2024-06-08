import { HttpClient } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, computed, signal } from "@angular/core";
import { Cart } from "../model/cart.model";
import { Product } from "../model/product.model";
import { environment } from "../../../environment";
import { Basket } from "../model/basket.model";
import { Observable, catchError, switchMap, tap, throwError } from "rxjs";
import { Item } from "../model/item.model";
import { Order } from "../model/order.model";
import { Address } from "../model/address.model";
import { AuthService } from "../../core/services/authentcation.service";
import { DeliveryMethod } from "../model/delivery-method.model";
import { ToastrService } from "ngx-toastr";


@Injectable({
    providedIn:'root'
})
export class CartService
{

    private CreateOrUpdate = `${environment.localhost}Basket`
    private getBusket = `${environment.localhost}Basket?basketId=1`
    private createOrder = `${environment.localhost}ClientOrders`
    private createCompanyOrder = `${environment.localhost}CompanyOrders`
    private getDeliveryMehtods = `${environment.localhost}CompanyOrders/DeliveryMethods`

    private _productsSignal:WritableSignal<Item[]>= signal<Item[]>([]);
    deliveryMethods!:DeliveryMethod[];
  
    cart = computed(() => ({
        products: this._productsSignal()??[]
    }));
    count = computed<number>(() => {
        return this._productsSignal()? this._productsSignal().length:0;
    });
    Basket!:Basket;

    constructor(private _http: HttpClient,private authServ:AuthService,private toastr:ToastrService) {
        _http.get<Basket>(this.getBusket).subscribe(data=>{
            this.Basket = data;
            this._productsSignal.set(data.items)
        })

        _http.get<DeliveryMethod[]>(this.getDeliveryMehtods).subscribe(data=>{
            this.deliveryMethods  = data
        })

    }

    addProduct(product: Item): void {
      if (this._productsSignal()) {
          this._productsSignal.update(products => {
              const productIndex = products.findIndex(p => p.productName === product.productName);
              if (productIndex !== -1) {
                  // Product already exists, update quantity
                  const updatedProducts = [...products];
                  updatedProducts[productIndex] = {
                      ...updatedProducts[productIndex],
                      quantity: updatedProducts[productIndex].quantity + 1
                  };
                  return updatedProducts;
              } else {
                  // Product does not exist, add new product with quantity 1
                  return [...products, { ...product, quantity: 1 }];
              }
          });
  
          this.Basket.items = this._productsSignal();
          
          this._http.post<Basket>(this.CreateOrUpdate, this.Basket).subscribe({
              next: (response) => {
                  // Handle successful response
                  console.log('Basket updated:', response);
              },
              error: (error) => {
                  // Handle error response
                  console.error('Error updating basket:', error);
              }
          });
  
          console.log(this._productsSignal());
  
      } else {
          let products:Item[] = [product];
          // Initialize _productsSignal with an array containing the new product
          (this._productsSignal).set(products);
      }
  }
  

    removeProduct(productName: string) {
        this._productsSignal.update(products => {
            const productIndex = products.findIndex(p => p.productName === productName);
            if (productIndex !== -1) {
            const updatedProducts = [...products];
            const currentQuantity = updatedProducts[productIndex].quantity;
            if (currentQuantity > 1) {
                updatedProducts[productIndex] = {
                ...updatedProducts[productIndex],
                quantity: currentQuantity - 1
                };
                return updatedProducts;
            } else {
                return updatedProducts.filter(p => p.productName !== productName);
            }
            }
            return products;
        });
        this.Basket.items = this._productsSignal()
        this._http.post<Basket>(this.CreateOrUpdate,this.Basket).subscribe()
    }

    removeWholeProduct(productName: string) {
        this._productsSignal.update(products => products.filter(p => p.productName !== productName));
    }

    emptyCart() {
      this._productsSignal.set([]); // Clear the products
      this.Basket.items = []; // Clear the basket items
      this._http.post<Basket>(this.CreateOrUpdate, this.Basket).subscribe();
    }
    

    getProducts() {
        return this._productsSignal();
    }



    getCart() {

        return this.cart();
    }

    getTotalQuantity() {
      if(this.cart().products)
        {
          return this.cart().products.reduce((total, product) => total + product.quantity, 0);

        }
        return 0
    }


   getTotalPrice() {
    if(this.cart().products)
      {
        return this.cart().products.reduce((total, product) => total + (product.price * product.quantity), 0);

      }
      return 0
    }

    CreateOrder(address: Address, deliveryMethodId: string): Observable<any> {
      let order: Order = {
        basketId: '1',
        deliveryMethodId: parseInt(deliveryMethodId),
        shipAddress: address
      };
  
      console.log(order);
  
      return this.authServ.stateItem$.pipe(
        switchMap(data => {
          if (data?.role === 'user') {
            return this._http.post<any>(this.createOrder, order).pipe(
              tap(() => {
                this._productsSignal.update(() => []);
                this.emptyCart();
                this.toastr.success('Order created successfully!', 'Success');
              })
            );
          } else {
            return this._http.post<any>(this.createCompanyOrder, order).pipe(
              tap(() => {
                this._productsSignal.update(() => []);
                this.toastr.success('Company order created successfully!', 'Success');
              })
            );
          }
        }),
        catchError(error => {
          // this.toastr.error('An error occurred while creating the order', 'Error');
          return throwError(error);
        })
      );
    }
  
  

}