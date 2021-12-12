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

    // Metodo que crea los productos en la tabla products
    async createProducts(product: ProductInterface): Promise<Products> {

        try {
            const consult: Products = await this.products.create(product);
            return consult;
        } catch (error) {
            return error;
        }
    }

    // Este metodo resuelte la consulta de productos filtrados y lo retorna con paginación
    async getAllProduct(limit, skip, where): Promise<ResultProductPaginate> {

        try {
            where = this.conditions(where);
            let options = {
                where,
                offset: this.getOffset(skip, limit),
                limit: limit,
            };
            let {count, rows} = await this.products.findAndCountAll(options);
            rows = this.transform(rows);
            const result: ResultProductPaginate = {
                previousPage: this.getPreviousPage(skip),
                currentPage: skip,
                nextPage: this.getNextPage(skip, limit, count),
                itemsTotal: count,
                limit: limit,
                numberPages: this.getNumberPages(count, limit),
                data: rows,
            }
            return result;
        } catch (error) {
            return error;
        }
    }

    // Metodo que trae un producto por id
    async getOne(productId: number): Promise<any> {
        try {
            const consult = await this.products.findOne({
                where: { productId }
            });
            const { productId: id, name, price, sku, quantity } = consult;
            const data = {
                productId: id, name, price, sku, quantity
            }
            return data;
        } catch (error) {
            return error;
        }
    }

    // Metodo que actualiza productos por id
    async updateProduct(productId: number, data: ProductInterface): Promise<[number, Products[]]> {

        try {
            
            const consult = await this.products.update(data, {
                where: {
                    productId
                },
                individualHooks: true
            });
            return consult;
        } catch (error) {
            return error;
        }
    }

    // Este metodo crea la condición de consulta a la db segun el filtro y el rango de precios
    conditions(where) {
        try {
            const option = ["name", "sku", "quantity"]
            const ranged = ["price1", "price2"];
            let condition = {};
            let rangedPrice = [];
            where.forEach(element => {
                for (const key in element) {
                    if (option.includes(key)) {
                        console.log(element[key])
                        condition[key] = Number(element[key])
                    }
                    if (ranged.includes(key)) {
                        rangedPrice.push(Number(element[key])); 
                    }
                }
            });
            if (rangedPrice.length > 0) {
                return where = {
                    ...condition,
                    price: {
                        [Op.between]: rangedPrice
                    }
                }
            } else {
                return where = {
                    ...condition,
                }
            }
        } catch (error) {
            return error;
        }
    }

    // Metodo que sirve para procesar la paginación
    getOffset(page: number, limit: number) {
        return (page * limit) - limit;
    }

    // Indica cual sera la proxima pagina
    getNextPage(page: number, limit: number, total: number) {
        if ((total/limit) > page) {
            return page + 1;
        }
    
        return null
    }
    // Indica cual es la pagina actual
    getPreviousPage (page: number) {
        if (page <= 1) {
            return null
        }
        return page - 1;
    }

    // Indica el numero de paginas existente en consulta
    getNumberPages(count: number, limit: number) {
        return (Math.round(count / limit));
    }

    // Metodo que muestra como se visualizara la data de los productos
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
