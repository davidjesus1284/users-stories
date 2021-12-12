export class OrderDTO {
    direction: string;
    paymentId: number;
    shoppingCartId:  number;
    userId:    number;
}

export class Products {
    nameProduct: string;
    sku:         number;
    price:       number;
    quantity:    number;
}