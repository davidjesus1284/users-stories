import { Body, Controller, Post, Res, HttpStatus, Param, Get, Query } from '@nestjs/common';
import { Response } from 'express';
import { ProductDTO } from './dto/productDTO';
import { ProductService } from './product.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('/')
    @ApiOperation({ summary: 'Servicio para crear productos'})
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
    @ApiOperation({ summary: 'Consulta de productos paginados segun rango de precios, nombre, sku o cantidad disponible'})
    async getAll(@Res() res: Response, @Query() query: any ) {

        try {
            const limit = parseInt(query.limit);
            const skip = parseInt(query.skip);
            const conditions = [query]
            const result = await this.productService.getAllProduct(limit, skip, conditions);
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
