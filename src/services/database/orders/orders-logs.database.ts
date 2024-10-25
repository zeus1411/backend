import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import UserDB from '../users/users.database';
import OrdersDB from './orders.database';

@Table({
    tableName: 'orders_logs',
    timestamps: true,
    paranoid: true,
})
export default class OrdersLogsDB extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => UserDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private user!: number;

    @BelongsTo(() => UserDB)
    userInfo!: UserDB;

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
        allowNull: false,
    })
    private content!: string;

}
