import { Address } from "./address.model";


export interface Order{
    basketId:string,
    deliveryMethodId:number,
    shipAddress:Address
}