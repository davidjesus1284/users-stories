export interface OrderInterface {
    userId:    number;
    productId: number;
    products:  Product[];
}

export interface Product {
    productsId: number;
    quantity:   number;
}
export interface ProductsDelete {

    products?: string;
    state?: boolean;
}