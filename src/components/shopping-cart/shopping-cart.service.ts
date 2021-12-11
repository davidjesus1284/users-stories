import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderInterface, Product, ProductsDelete } from './interfaces/order';
import { ShoppingCart } from './models/shoppingCart';
import { ProductService } from '../product/product.service';
import { Products } from '../product/models/products';

@Injectable()
export class ShoppingCartService {

    constructor(
        @InjectModel(ShoppingCart)
        private shoppingCart: typeof ShoppingCart,
        private productService: ProductService
    ) {}

    async createOrder(order: OrderInterface): Promise<ShoppingCart | any> {

        try {
            
            const products = order.products;
            const productOrden = await this.getAllOrderByProductId(products);
            const data = {
                userId: order.userId,
                products: JSON.stringify(productOrden)
            }
            console.log(data);
            const createOne = await this.shoppingCart.create(data);
            return createOne;
        } catch (error) {
            return error;
        }
    }

    async deleteProducts(shoppingCartId: number, productId: number): Promise<[number, ShoppingCart[]]> {

        try {
            const consult = await this.shoppingCart.findOne({ where: { shoppingCartId }});
            let { products } = consult;
            let productsDelete: any = JSON.parse(products);
            for (const pd of productsDelete) {
                if (pd.productId == productId) {
                    let consultProduct = await this.productService.getAll(pd.productId);
                    const dataProductUpdate = { quantity: consultProduct.quantity + pd.quantity };
                    await this.productService.updateProduct(pd.productId, dataProductUpdate);
                }
            }
            products = JSON.stringify(productsDelete.filter( pd => {
                if (pd.productId != productId) {
                   return pd;
                }
            }));
            
            const data = { products };
            const updateProduct = await this.updateShoppingCart(shoppingCartId, data)
            return updateProduct;
        } catch (error) {
            return error;
        }
    }

    async updateShoppingCart(shoppingCartId: number, data: ProductsDelete): Promise<[number, ShoppingCart[]]> {

        try {
            const consult = await this.shoppingCart.update(data, {
                where: {
                    shoppingCartId
                },
                individualHooks: true
            });
            return consult;
        } catch (error) {
            return error;
        }
    }

    async getAllOrderByProductId(products: Product[]): Promise<Products[]> {
        
        try {
            let response: Products[] = [];
            for (const p of products) {
                if (p != undefined) {
                    
                    let consultProduct = await this.productService.getAll(p.productsId);
                    const dataProductUpdate = {
                        quantity: consultProduct.quantity - p.quantity
                    }
                    let productSelect = consultProduct;
                    productSelect.quantity = p.quantity;
                    
                    response.push(productSelect);
                    await this.productService.updateProduct(p.productsId, dataProductUpdate);
                }
            }
            return response
            
        } catch (error) {
            return error;
        }
    }

    async 
}
