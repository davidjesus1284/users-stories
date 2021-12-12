export class CartDTO {
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

export class UpdateQuantityProducts {
    shoppingCartId: number;
    productId: number;
    quantity: number;
}