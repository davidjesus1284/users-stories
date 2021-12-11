import { SequelizeModuleOptions } from '@nestjs/sequelize';

export default (): SequelizeModuleOptions  => ({
    dialect: 'mysql',
    host: process.env.MYSQ_DB_HOST,
    port: Number.parseInt(process.env.MYSQ_DB_PORT),
    username: process.env.MYSQ_DB_USERNAME,
    password: process.env.MYSQ_DB_PASSWORD,
    database: process.env.MYSQ_DB_DATABASE,
    models: [],
    autoLoadModels: true,
    synchronize: true
});
