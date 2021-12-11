import { Products } from '../models/products';
export interface ProductInterface {

    name: string;
    sku: number;
    price: number;
    quantity: number;
};

export interface ResultProductPaginate {
    previousPage: number;
    currentPage: number;
    nextPage: number;
    total: number;
    limit: number;
    numberPages: number;
    data: Products[];
}