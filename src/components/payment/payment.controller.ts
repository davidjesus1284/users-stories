import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { PaymentDTO } from './dto/paymentDTO';

@ApiTags('Payment')
@Controller('payments')
export class PaymentController {

    constructor(private paymentService: PaymentService) {}

    @Post('/')
    @ApiOperation({ summary: 'Crear un metodo de pago'})
    async createOne(@Res() res: Response, @Body() payment: PaymentDTO) {
        
        try {
            const result = await this.paymentService.createPayment(payment);
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
