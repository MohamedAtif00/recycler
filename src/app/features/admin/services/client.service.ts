import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environment";
import { Client } from "../model/client.model";
import { Order } from "../../../shared/model/order.model";


@Injectable({
    providedIn:'root'
})
export class ClientService{

    private getAllClients = `${environment.localhost}Account/AllClients`
    private getAllClientsOrders = `${environment.localhost}ClientOrders`
    private deleteClient = `${environment.localhost}Account/Client?email=`
    constructor(private _http:HttpClient){}

    GetAllClients()
    {
        return this._http.get<Client[]>(this.getAllClients);
    }

    GetClientsOrders()
    {
        return this._http.get<any>(this.getAllClientsOrders);
    }

    DeleteClient(email:string)
    {
        return this._http.delete(this.deleteClient+email);
    }
}