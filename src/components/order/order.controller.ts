import { Body, Controller, Post, Res, HttpStatus, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OrderDTO } from './dto/orderDTO';

@ApiTags('Realizar pedidos')
@Controller('orders')
export class OrderController {
    
    constructor(private orderService: OrderService) {}

    @Post('/')
    @ApiOperation({ summary: 'Creación de una orde almacenada en el carrito de compras'})
    async createOneOrder(@Res() res: Response, @Body() order: OrderDTO) {

        try {
            const result = await this.orderService.createOrder(order);
            return res.status(HttpStatus.OK).json({
                state: true,
                result
            })
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                state: false,
                message: 'Error interno en el servidor'
            })
        }
    }

    @Get('/:userId')
    @ApiOperation({ summary: 'Consulta de ordenes por usuarios'})
    async getAllOrden(@Res() res: Response, @Param('userId', ParseIntPipe) userId: string) {

        try {
            const result = await this.orderService.getOrderByUserId(Number(userId));
            return res.status(HttpStatus.OK).json({
                state: true,
                result
            })
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                state: false,
                message: 'Error interno en el servidor'
            })
        }
    }
}
