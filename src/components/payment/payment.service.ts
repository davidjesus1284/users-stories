import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentInterface } from './interface/payment.interfaces';
import { Payment } from './models/payment';

@Injectable()
export class PaymentService {

    constructor(
        @InjectModel(Payment)
        private payment: typeof Payment
    ) {}

    // Metodo para crear los medios de pagos
    async createPayment(data: PaymentInterface): Promise<Payment> {

        try {
            const consult: Payment = await this.payment.create(data);
            return consult; 
        } catch (error) {
            return error;
        }
    }
    // Metodo que obtiene los metodos de pagos por id
    async getPaymentById(paymentId: number): Promise<Payment> {

        try {
            const consult: Payment = await this.payment.findOne({
                where: {
                    paymentId
                }
            });
            return consult;
        } catch (error) {
            return error;
        }
    }
}
