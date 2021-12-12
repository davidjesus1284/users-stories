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
            if (productOrden.state == false) {
                return productOrden.message;
            }
            const data = {
                userId: order.userId,
                products: JSON.stringify(productOrden)
            }
            
            const createOne = await this.shoppingCart.create(data);
            return createOne;
        } catch (error) {
            return error;
        }
    }

    async deleteProducts(shoppingCartId: number, productId: number): Promise<ShoppingCart> {

        try {
            const consult = await this.getOneShoppingCart(shoppingCartId);
            let { products } = consult;
            let productsDelete: any = JSON.parse(products);
            await this.auxDelectProduct(productsDelete, productId);
            products = JSON.stringify(productsDelete.filter( pd => {
                if (pd.productId != productId) {
                   return pd;
                }
            }));
            
            const data = { products };
            const deleteProduct = await this.updateShoppingCart(shoppingCartId, data)
            return JSON.parse(deleteProduct.products);
        } catch (error) {
            return error;
        }
    }

    async updateProductCart(shoppingCartId: number, productId: number, quantity: number): Promise<ShoppingCart | any> {
        try {
            
            let { products } = await this.getOneShoppingCart(shoppingCartId);
            const productQuantityUpdate = JSON.parse(products);
            if (productQuantityUpdate.length == 0) {
                return 'No hay productos en el carrito';
            }
            await this.auxUpdateProductCart(productQuantityUpdate, productId, quantity);
            products = this.auxProductUp(products, productQuantityUpdate, productId, quantity);
            const data = { products }
            
            const response = await this.updateShoppingCart(shoppingCartId, data);
            return JSON.parse(response.products);
        } catch (error) {
            return error;
        }
    }

    async getOneShoppingCart(shoppingCartId: number): Promise<ShoppingCart> {

        try {
            const consult = await this.shoppingCart.findOne({ where: {shoppingCartId}});
            return consult;
        } catch (error) {
            return error;
        }
    }

    async updateShoppingCart(shoppingCartId: number, data: ProductsDelete): Promise<ShoppingCart> {

        try {
            const consult = await this.shoppingCart.update(data, {
                where: {
                    shoppingCartId
                },
                individualHooks: true
            });
            const resp = consult[1];
            const [response] = resp
            return response;
        } catch (error) {
            return error;
        }
    }

    async getAllOrderByProductId(products: Product[]): Promise<Products[] | any> {
        
        try {
            let response: Products[] = [];
            
            for (const p of products) {
                if (p != undefined) {
                    
                    let consultProduct = await this.productService.getAll(p.productsId);
                    if (consultProduct.quantity == 0) {
                        return {state: false, message: `No hay disponible ${consultProduct.name} en stock`};
                    }
                    const dataProductUpdate = {
                        quantity: consultProduct.quantity - p.quantity
                    }
                    let productSelect = consultProduct;
                    productSelect.quantity = p.quantity;
                    
                    response.push(productSelect);
                    await this.productService.updateProduct(p.productsId, dataProductUpdate);
                }
            }
            return response;
            
        } catch (error) {
            return error;
        }
    }

    async auxUpdateProductCart(products: any, productId: number, quantity) {

        try {
            for (const product of products) {
                if (product.productId == productId) {
                    if (product.quantity > quantity) {
                        let consultProduct = await this.productService.getAll(product.productId);
                        const dataProductUpdate = { quantity: consultProduct.quantity + (product.quantity - quantity) };
                        
                        await this.productService.updateProduct(product.productId, dataProductUpdate);
                    } else {
                        let consultProduct = await this.productService.getAll(product.productId);
                        const dataProductUpdate = { quantity: consultProduct.quantity - (quantity - product.quantity) };
                        if (dataProductUpdate.quantity < 0) {
                            return 'Esta excediendo la cantidad disponible en stock'
                        }
                        await this.productService.updateProduct(product.productId, dataProductUpdate);
                    }
                }
            }
        } catch (error) {
            return error;
        }
    }

    auxProductUp(products: any, productQuantityUpdate: any, productId: number, quantity: number) {

        products = JSON.stringify(productQuantityUpdate.map( product => {
            if (product.productId == productId) {
                
                if (product.quantity > quantity) {
                    product.quantity = product.quantity - (product.quantity - quantity)
                } else {
                    product.quantity = product.quantity + (quantity - product.quantity)
                }
                
            }
            return product;
        }));

        return products;
    }

    async auxDelectProduct(productsDelete: any, productId: number) {

        try {
            for (const pd of productsDelete) {
                if (pd.productId == productId) {
                    let consultProduct = await this.productService.getAll(pd.productId);
                    const dataProductUpdate = { quantity: consultProduct.quantity + pd.quantity };
                    await this.productService.updateProduct(pd.productId, dataProductUpdate);
                }
            }
        } catch (error) {
            return error;
        }
    }
 
}
