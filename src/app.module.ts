import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/user/user.module';
import { ProductModule } from './components/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCartModule } from './components/shopping-cart/shopping-cart.module';
import { OrderModule } from './components/order/order.module';
import { PaymentModule } from './components/payment/payment.module';
import configSequelize  from 'src/utils/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    load: [configSequelize]
  }),
  SequelizeModule.forRoot(configSequelize()),
  UserModule, ProductModule, ShoppingCartModule, OrderModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
