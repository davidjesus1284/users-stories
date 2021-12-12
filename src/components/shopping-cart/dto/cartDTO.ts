import { ApiProperty } from "@nestjs/swagger";

export class CartDTO {
    @ApiProperty()
    userId:    number;
    @ApiProperty()
    productId: number;
    @ApiProperty({ description: 'Ejemplo: [{ "productsId": 6, "quantity": 2}]'})
    products:  Product[];
}
export class Product {
    @ApiProperty()
    productsId: number;
    @ApiProperty()
    quantity:   number;
}

export class DeleteProductsDTO {
    @ApiProperty()
    shoppingCartId: number;
    @ApiProperty()
    productId: number;
}

export class UpdateQuantityProducts {
    @ApiProperty()
    shoppingCartId: number;
    @ApiProperty()
    productId: number;
    @ApiProperty()
    quantity: number;
}