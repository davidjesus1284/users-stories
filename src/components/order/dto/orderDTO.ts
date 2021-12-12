import { ApiProperty } from "@nestjs/swagger";

export class OrderDTO {
    @ApiProperty()
    direction: string;
    @ApiProperty()
    paymentId: number;
    @ApiProperty()
    shoppingCartId:  number;
    @ApiProperty()
    userId:    number;
}

export class Products {
    nameProduct: string;
    sku:         number;
    price:       number;
    quantity:    number;
}