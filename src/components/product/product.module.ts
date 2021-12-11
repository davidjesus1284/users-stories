import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from './models/products';

@Module({
  imports: [SequelizeModule.forFeature([Products])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
