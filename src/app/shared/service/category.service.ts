import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { Category } from "../model/category.model";


@Injectable({
    providedIn:'root'
})
export class CategoryService{


    private getAllCategories:string = `${environment.localhost}Category`
    private createCategory = `${environment.localhost}Category/AddCategory`
    private updateCategory = `${environment.localhost}Category/UpdateCategory/`
    constructor(private _http:HttpClient){}

    GetAllCategories()
    {
        return this._http.get<Category[]>(this.getAllCategories)
    }

    CreateCategory(request:Category)
    {
        return this._http.put<Category>(this.createCategory,request);
    }

    UpdateCategory(item:Category)
    {
        return this._http.put<Category>(this.updateCategory+item.id,item);
    }
}