import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersInterface } from './interfaces/users.interfaces';
import { Users } from './models/users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(Users)
        private users: typeof Users
    ) {}

    // Metodo para crear usuarios que realizaran pedidos
    async createUsers(users: UsersInterface): Promise<Users> {

        try {
            let { password } = users;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            users.password = hash
            const consult: Users = await this.users.create(users);
            return consult
        } catch (error) {
            return error;
        }
    }
}
