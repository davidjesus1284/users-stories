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
    tableName: 'Products'
})
export class Products extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column( DataType.INTEGER )
    productId: number;

    @AllowNull(false)
    @Column( DataType.STRING(100) )
    name: string;

    @AllowNull(false)
    @Column( DataType.INTEGER )
    sku: number;

    @AllowNull(false)
    @Column( DataType.INTEGER )
    price: number;

    @AllowNull(false)
    @Column( DataType.INTEGER )
    quantity: number;

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