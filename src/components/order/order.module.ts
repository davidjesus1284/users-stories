import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';

@Module({
  imports: [ShoppingCartModule, SequelizeModule.forFeature([Order])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
