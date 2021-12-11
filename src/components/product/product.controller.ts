import { Body, Controller, Post, Res, HttpStatus, Param, Get, Query } from '@nestjs/common';
import { Response } from 'express';
import { ProductDTO } from './dto/productDTO';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('/')
    async createOne(@Res() res: Response, @Body() product: ProductDTO) {

        try {
            const result = await this.productService.createProducts(product);
            return res.status(HttpStatus.OK).json({
                state: true,
                result
            })
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                state: false,
                message: 'Error interno de servicio'
            })
        }
    }

    @Get('/')
    async getAll(@Res() res: Response, @Query() query ) {

        try {
            const limit = parseInt(query.limit);
            const skip = parseInt(query.skip);
            const price1 = parseInt(query.price1)
            const price2 = parseInt(query.price2)
            console.log(query);
            const conditions = [query]
            const result = await this.productService.getAllProduct(limit, skip, conditions, price1, price2);
            return res.status(HttpStatus.OK).json({
                state: true,
                result
            });
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                state: false,
                message: 'Error interno de servicio'
            })
        }
    }
}
