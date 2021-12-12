import { SequelizeModuleOptions } from '@nestjs/sequelize';

export default (): SequelizeModuleOptions  => ({
    dialect: 'mysql', // que tipo de base de datos se uso
    host: process.env.MYSQ_DB_HOST, // ip del servidor
    port: Number.parseInt(process.env.MYSQ_DB_PORT), // Puerto
    username: process.env.MYSQ_DB_USERNAME, // usuario
    password: process.env.MYSQ_DB_PASSWORD, // contraseña
    database: process.env.MYSQ_DB_DATABASE, // base de datos
    models: [],
    autoLoadModels: true, //Carga automaticamente los modelos de base de datos
    synchronize: true // lo sincroniza con la DB
});
// Este archivo contiene la configuracion necesaria para que sequelize se conecte con la base de datos