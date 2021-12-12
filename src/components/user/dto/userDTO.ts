import { ApiProperty } from '@nestjs/swagger';
export class UserDTO {

    @ApiProperty()
    name: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}