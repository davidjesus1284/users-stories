import { ApiProperty } from '@nestjs/swagger';
export class ProductDTO {
    @ApiProperty()
    name: string;
    @ApiProperty()
    sku: number;
    @ApiProperty()
    price: number;
    @ApiProperty()
    quantity: number;
}