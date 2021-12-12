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
import { ShoppingCart } from 'src/components/shopping-cart/models/shoppingCart';
import { Users } from 'src/components/user/models/users';
import { Payment } from '../../payment/models/payment';

@Table({
    tableName: 'Order'
})
export class Order extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column( DataType.INTEGER )
    orderId: number;

    @AllowNull(false)
    @Column( DataType.STRING )
    direction: string;

    @ForeignKey( () => Payment)
    @AllowNull(false)
    @Column( DataType.INTEGER )
    paymentId: number;

    @Default('Pending')
    @AllowNull(false)
    @Column( DataType.ENUM('Pending', 'Delivered') )
    status: string;

    @ForeignKey( () => ShoppingCart)
    @AllowNull(false)
    @Column( DataType.INTEGER )
    shoppingCartId: number;

    @ForeignKey( () => Users)
    @AllowNull(false)
    @Column( DataType.INTEGER )
    userId: number;

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

    // Hace referencia a una tabla por la llave foranea
    @BelongsTo( () => Payment, 'paymentId')
    payment!: Payment;

    // Hace referencia a una tabla por la llave foranea
    @BelongsTo( () => Users, 'userId')
    users!: Users

    // Hace referencia a una tabla por la llave foranea
    @BelongsTo( () => ShoppingCart, 'shoppingCartId')
    shoppingCart!: ShoppingCart;
}