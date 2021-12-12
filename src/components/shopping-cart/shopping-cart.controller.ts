import { Body, Controller, Post, Res, HttpStatus, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { DeleteProductsDTO, UpdateQuantityProducts, CartDTO } from './dto/cartDTO';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-carts')
export class ShoppingCartController {

    constructor(private shoppingCartService: ShoppingCartService) {}

    @Post('/')
    async createOneOrder(
        @Res() res: Response, 
        @Body() order: CartDTO ) {
            
            try {
                const consult = await this.shoppingCartService.createOrder(order);

                return res.status(HttpStatus.OK).json({
                    state: true,
                    consult, 
                })

            } catch (error) {
                console.log(error);
                return res.status(HttpStatus.BAD_REQUEST).json({
                    state: false,
                    message: 'Error interno en el servicio'
                })
            }
        }
    
    @Delete('/delete/products')
    async deleteProducts(@Res() res: Response, @Body() productsDelete: DeleteProductsDTO) {

        try {
            const { shoppingCartId, productId } = productsDelete;
            const result = await this.shoppingCartService.deleteProducts(shoppingCartId, productId);
            return res.status(HttpStatus.OK).json({
                state: true,
                result
            })
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                state: false,
                message: 'Error interno en el servicio'
            })
        }
    }

    @Put('/update/quantity/products')
    async updateQuantityProduct(@Res() res: Response, @Body() quantityProduct: UpdateQuantityProducts) {

        try {
            const { shoppingCartId, productId, quantity } = quantityProduct;
            const result = await this.shoppingCartService.updateProductCart(shoppingCartId, productId, quantity);
            return res.status(HttpStatus.OK).json({
                state: true,
                result
            })
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                state: false,
                message: 'Error interno en el servicio'
            })
        }
    }
}