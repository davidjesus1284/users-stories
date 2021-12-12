import { Order } from '../../order/models/order';
import { HasOne } from 'sequelize-typescript';
import { 
    Table, 
    Model, 
    Column, 
    PrimaryKey, 
    AutoIncrement, 
    DataType, 
    AllowNull, 
    Default,
} from 'sequelize-typescript';

@Table({
    tableName: 'Payment'
})
export class Payment extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column( DataType.INTEGER )
    paymentId: number;

    @AllowNull(false)
    @Column( DataType.STRING(100) )
    name: string;

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