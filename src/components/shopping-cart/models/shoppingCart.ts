import { Users } from '../../user/models/users';
import { 
    Table, 
    Model, 
    Column, 
    PrimaryKey, 
    AutoIncrement, 
    DataType, 
    AllowNull, 
    Default,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';

@Table({
    tableName: 'ShoppingCart'
})
export class ShoppingCart extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column( DataType.INTEGER )
    shoppingCartId: number;

    @ForeignKey( () => Users)
    @AllowNull(false)
    @Column( DataType.INTEGER )
    userId: number;

    @AllowNull(false)
    @Column
    products: string;

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

    @BelongsTo( () => Users, 'userId')
    users!: Users;
}