import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import ProductsDB from '../products/product.database';
import AddressesDB from '../users/address.database';
import UserDB from '../users/users.database';
import WebsiteDB from '../websites.database';

@Table({
    tableName: 'orders',
    timestamps: true,
    paranoid: true,
})
export default class OrdersDB extends Model {
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

    @ForeignKey(() => AddressesDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private addresses!: number;

    @BelongsTo(() => AddressesDB)
    addressInfo!: AddressesDB;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    private images: string[];

    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    private products!: string[];

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private orderCode!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private deposit!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private orderPrice!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private shipPrice!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private discountPrice!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private deliveryMethod!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private deliveryStatus!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private paymentMethod!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private paymentStatus!: number;

    @ForeignKey(() => WebsiteDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private website!: number;

    @BelongsTo(() => WebsiteDB)
    websiteInfo!: WebsiteDB;
}
