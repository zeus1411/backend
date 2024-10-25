import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'images',
    timestamps: true,
    paranoid: true,
})
export default class ImagesDB extends Model {
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
    private title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private url!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    private size!: number;

}
