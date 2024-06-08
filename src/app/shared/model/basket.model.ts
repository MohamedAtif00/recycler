import { Item } from "./item.model";

export interface Basket{
    id:string,
    items:Item[],
    paymentIntentId:string | null,
    clientSecret:string | null,
    deliveryMethodId:number |null
}