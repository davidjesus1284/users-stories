import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCart } from './models/shoppingCart';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule, SequelizeModule.forFeature([ShoppingCart])],
  providers: [ShoppingCartService],
  controllers: [ShoppingCartController],
  exports: [ShoppingCartService]
})
export class ShoppingCartModule {}
