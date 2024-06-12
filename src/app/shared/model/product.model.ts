export interface Product {
    id: number;
    name: string;
    pictureUrl: string;
    picture:Blob | File | null;
    category: string;
    categoryId:string;
    inventory:number;
    price: number;
}