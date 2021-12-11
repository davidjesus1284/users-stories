import { 
    Table, 
    Model, 
    Column, 
    PrimaryKey, 
    AutoIncrement, 
    DataType, 
    AllowNull, 
    Default
} from 'sequelize-typescript';

@Table({
    tableName: 'Users'
})
export class Users extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column( DataType.INTEGER )
    userId: number;

    @AllowNull(false)
    @Column( DataType.STRING(100) )
    name: string;

    @AllowNull(false)
    @Column( DataType.STRING(50) )
    lastName: string;

    @AllowNull(false)
    @Column( DataType.STRING(50) )
    email: string;

    @AllowNull(false)
    @Column( DataType.STRING(45) )
    username: string;

    @AllowNull(false)
    @Column( DataType.STRING(45) )
    password: string;

    @Default(true)
    @AllowNull(false)
    @Column
    state: boolean;

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;

    @Column
    deletedAt: Date;
}