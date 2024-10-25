import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import ChildCategoryDB from './child-category.database';

@Table({
    tableName: 'category',
    timestamps: true,
    paranoid: true,
})
export default class CategoryDB extends Model {
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

    @HasMany(() => ChildCategoryDB)
    childCategory!: ChildCategoryDB[];
}
