## Documentación donde estan todas las rutas del servidor

[Postman](https://documenter.getpostman.com/view/7918195/UVJhCZiG)

## Resumen

Esta aplicación se encarga del manejo de historias de usuarios en un api de E-commerce

## Framework y paquetes utilizado

- Nest.js
- @nestjs/sequelize
- @nestjs/swagger 4.8.2
- bcrypt
- mysql2
- sequelize
- sequelize-typescript
- swagger-ui-express 4.1.6
## Instrucciones para su configuración

Despues de clonar el proyecto haga los siguientes paso:
``````````
$ npm install
``````````
Debera crar el archivo .env y colocara la siguiente informacion:

- MYSQ_DB_HOST=127.0.0.1
- MYSQ_DB_PORT=3306
- MYSQ_DB_USERNAME=root
- MYSQ_DB_PASSWORD=''
- MYSQ_DB_DATABASE=users_stories
- PORT=4200

## Explicación de rutas

[Swagger](http://localhost:4200/api/users-stories/docs/#/)
* Metodo POST /api/users-stories/users Esta ruta se utiliza para crear usuarios este es el cuerpo de uso:

- {"name": "user1", "lastName": "user1", "email": "user@gmail.com", "username": "user123","password": "123456789"}

* Metodo POST /api/users-stories/products Sirve para poder crear productos cuerpo de uso: 

- {"name": "Silla Gamer Roja", "sku": 3456, "price": 1300, "quantity": 7}

*

* Metodo GET /api/users-stories/products?limit=4&skip=1&price1=500&price2=2000 Se obtine informacion de los productos existente segun el rango de precios, cantidad, nombres y codigo sku ademas de traer la data paginada

- limit: Indicas cuantos objetos vendran de la base de datos
- skip: Aca se indica la pagina que va a visualizar
- price1: Precio inicial
- price2: Precio final
- name: nombre de producto
- sku: codigo de stock de productos
- quantity: cantidad de producto

* Metodo POST /api/users-stories/shopping-carts/ Se crea los pedidos en el carrito de compras. Este es su cuerpo:
- {"userId": 1,"products": [{ "productsId": 6, "quantity": 2},{ "productsId": 2, "quantity": 3}]}

* Metodo DELETE /api/users-stories/shopping-carts/delete/products Se encarga de eliminar un producto por id de producto en un pedido. Cuerpo de uso: 
- {"shoppingCartId": 6, "productId": 6}

* Metodo PUT /api/users-stories/shopping-carts/update/quantity/products Se actualiza la cantidad de un producto especifico del pedido. Cuerpo de solicitud: 
- {"shoppingCartId": 6, "productId": 2, "quantity": 4}

* 

## Comenzar la aplicación con el siguiente comando

```bash
# development
$ npm run dev

## Additional note:

Si usted no posee instalado la base de datos de PostgreSQL puede ejecutar el siguiente comando:

$ docker-composer up
$ Ingreso: http://127.0.0.1/login?next=%2F

Nota: en el archivo docker-compose hay una sección que se llama environment, alli debera especificar las credenciales que va usar en su base de datos las mismas que usara en el archivo de variables de entorno.

Recuerde que, para que funcione, debera tener instalado docker en su computadora y debera de iniciarlo luego podra ejecutar el comando indicado.
```