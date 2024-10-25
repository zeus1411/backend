import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'brands',
    timestamps: true,
    paranoid: true,
})
export default class BrandsDB extends Model {
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
}
