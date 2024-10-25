import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import OrdersDB from './orders.database';
import TrackingTypeDB from './tracking-type.database';

@Table({
    tableName: 'tracking',
    timestamps: true,
    paranoid: true,
})
export default class TrackingDB extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => OrdersDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private order!: number;

    @BelongsTo(() => OrdersDB)
    orderInfo!: OrdersDB;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    private inlandCode!: string;

    @ForeignKey(() => TrackingTypeDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    private type!: number;

    @BelongsTo(() => TrackingTypeDB)
    typeInfo!: TrackingTypeDB;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    private content!: string;

}
