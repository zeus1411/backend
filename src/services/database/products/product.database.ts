import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import BrandsDB from './brands.database';
import CategoryDB from './category.database';
import ChildCategoryDB from './child-category.database';
import OrdersDB from '../orders/orders.database';

@Table({
    tableName: 'products',
    timestamps: true,
    paranoid: true,
})
export default class ProductsDB extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private name!: string;

    @Column({
        type: DataType.BLOB,
        allowNull: true,
    })
    private description!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private importPrice!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private price!: number;

    @ForeignKey(() => BrandsDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private brand!: number;

    @BelongsTo(() => BrandsDB)
    brandInfo!: BrandsDB;

    @ForeignKey(() => CategoryDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private category!: number;

    @BelongsTo(() => CategoryDB)
    categoryInfo!: CategoryDB;

    @ForeignKey(() => ChildCategoryDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private childCategory!: number;

    @BelongsTo(() => ChildCategoryDB)
    childCategoryInfo!: ChildCategoryDB;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    private tags!: string[];

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private image!: string;

    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    private images!: string[];

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private status!: number;
}
