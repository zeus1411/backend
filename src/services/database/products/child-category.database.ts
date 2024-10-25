import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import CategoryDB from './category.database';

@Table({
    tableName: 'child-category',
    timestamps: true,
    paranoid: true,
})
export default class ChildCategoryDB extends Model {
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
        type: DataType.STRING,
        allowNull: false,
    })
    private image!: string;

    @ForeignKey(() => CategoryDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private category!: number;

    @BelongsTo(() => CategoryDB)
    parentInfo!: CategoryDB;
}
