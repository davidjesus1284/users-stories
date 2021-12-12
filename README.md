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

- [Swagger](http://localhost:4200/api/users-stories/docs/#/)

En el enlace indicado se mostrada una interfaz grafica de todas las rutas del servidor con sus indicativos. A continuacion, indico una explicación sobre una ruta especifica para obtener data paginada.

* Metodo GET /api/users-stories/products?limit=4&skip=1&price1=500&price2=2000 Se obtine informacion de los productos existente segun el rango de precios, cantidad, nombres y codigo sku ademas de traer la data paginada

- limit: Indicas cuantos objetos vendran de la base de datos
- skip: Aca se indica la pagina que va a visualizar
- price1: Precio inicial
- price2: Precio final
- name: nombre de producto
- sku: codigo de stock de productos
- quantity: cantidad de producto

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