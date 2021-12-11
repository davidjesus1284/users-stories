import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ProductInterface, ResultProductPaginate } from './interfaces/product.interfaces';
import { Products } from './models/products';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Products)
        private products: typeof Products
    ) {}

    async createProducts(product: ProductInterface): Promise<Products> {

        try {
            const consult: Products = await this.products.create(product);
            return consult;
        } catch (error) {
            return error;
        }
    }

    async getAllProduct(limit, skip, where, price1, price2): Promise<ResultProductPaginate> {

        try {
            console.log("impresion de where", where);
            const option = ["name", "sku", "quantity"]
            let condition = {};
            where.forEach(element => {
                for (const key in element) {
                    
                    if (option.includes(key)) {
                        console.log(element[key])
                        condition[key] = Number(element[key])
                    }
                }
            });
            console.log("impresion de condicion", condition);
            let options = {
                where: {
                    ...condition,
                    price: {
                        [Op.between]: [price1, price2]
                    }
                },
                offset: this.getOffset(skip, limit),
                limit: limit,
            };
            let {count, rows} = await this.products.findAndCountAll(options);
            rows = this.transform(rows);
            const result: ResultProductPaginate = {
                previousPage: this.getPreviousPage(skip),
                currentPage: skip,
                nextPage: this.getNextPage(skip, limit, count),
                total: count,
                limit: limit,
                numberPages: this.getNumberPages(count, limit),
                data: rows,
            }
            return result;
        } catch (error) {
            return error;
        }
    }

    // async getOneProduct() {
    //     try {
            
    //     } catch (error) {
    //         return error;
    //     }
    // }

    getOffset(page: number, limit: number) {
        return (page * limit) - limit;
    }

    getNextPage(page: number, limit: number, total: number) {
        if ((total/limit) > page) {
            return page + 1;
        }
    
        return null
    }
    getPreviousPage (page: number) {
        if (page <= 1) {
            return null
        }
        return page - 1;
    }

    getNumberPages(count: number, limit: number) {
        return (Math.round(count / limit));
    }

    transform(records) {
        return records.map( record => {
            return {
                id: record.productId,
                name: record.name,
                sku: record.sku,
                price: record.price,
                quantity: record.quantity
            }
        })
    }
}
