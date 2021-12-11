import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserDTO } from './dto/userDTO';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private usersService: UserService) {}

    @Post('/')
    async createOne(@Res() res: Response, @Body() user: UserDTO) {
        
        try {
            const result = await this.usersService.createUsers(user);
            return res.status(HttpStatus.OK).json({
                state: true,
                result
            })
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                state: false,
                message: 'Error interno de servicio'
            })
        }
    }
}
