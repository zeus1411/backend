import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import UsersDB from './users.database';
import CountriesDB from './country.database';
import OrdersDB from '../orders/orders.database';

@Table({
    tableName: 'addresses',
    timestamps: true,
    paranoid: true,
})
export default class AddressesDB extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => UsersDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private user!: number;

    @BelongsTo(() => UsersDB)
    userInfo!: UsersDB;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private addresses!: string;

    @ForeignKey(() => CountriesDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private country!: number;

    @BelongsTo(() => CountriesDB)
    countryInfo!: CountriesDB;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private phone!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    private selected!: boolean;

    @HasMany(() => OrdersDB)
    orders!: OrdersDB[];
}
