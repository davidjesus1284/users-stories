import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment';

@Module({
  imports: [SequelizeModule.forFeature([Payment])],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
