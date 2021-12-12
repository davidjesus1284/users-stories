export interface OrderInter {
    direction: string;
    paymentId: number;
    shoppingCartId:  number;
    userId:    number;
}

export interface Products {
    nameProduct: string;
    sku:         number;
    price:       number;
    quantity:    number;
}

export interface AllOrders {
    numberOrder: number;
    name: string;
    lastName: string;
    creattionDate: Date;
    status: string;
    payment: string;
    products: any;
}