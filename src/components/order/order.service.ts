import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from '../payment/models/payment';
import { ShoppingCart } from '../shopping-cart/models/shoppingCart';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Users } from '../user/models/users';
import { AllOrders, OrderInter } from './interfaces/order.interfaces';
import { Order } from './models/order';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order)
        private order: typeof Order,
        private shoppingCartService: ShoppingCartService
    ) {}

    // Metodo que crea la orden y inhabilita el pedido en el carrito
    async createOrder(order: OrderInter): Promise<Order> {

        try {
            const consult: Order = await this.order.create(order);
            await this.shoppingCartService.updateShoppingCart(order.shoppingCartId, {state: false})
            return consult;
        } catch (error) {
            return error;
        }
    }

    // Este metodo se encarga de consultar el historial de pedido que tenga un usuario especifico
    async getOrderByUserId(userId: number): Promise<AllOrders[]> {

        try {
            const consult = await this.order.findAll({
                where: {
                    userId
                },
                include: [Users, Payment, ShoppingCart]
            });
            let response = consult.map( order => {
                const { users, shoppingCart, payment, orderId, createdAt, status } = order;
                const { name, lastName } = users;
                const data = {
                    numberOrder: orderId,
                    name,
                    lastName,
                    creattionDate: createdAt,
                    status: status,
                    payment: payment.name,
                    products: JSON.parse(shoppingCart.products)
                }
                return data;
            })
            return response;
        } catch (error) {
            return error;
        }
    }
}
