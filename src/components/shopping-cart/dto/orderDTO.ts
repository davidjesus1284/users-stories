export class OrderDTO {
    userId:    number;
    productId: number;
    products:  Product[];
}
export class Product {
    productsId: number;
    quantity:   number;
}

export class DeleteProductsDTO {
    shoppingCartId: number;
    productId: number;
}