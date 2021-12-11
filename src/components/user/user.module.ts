import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './models/users';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
