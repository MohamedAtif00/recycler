export interface Product {
    id: number;
    name: string;
    pictureUrl: string;
    picture:string | null;
    category: string;
    categoryId:string;
    inventory:number;
    price: number;
}