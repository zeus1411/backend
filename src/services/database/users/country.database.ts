import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import User from './users.database';

@Table({
    tableName: 'country',
    timestamps: false,
    paranoid: true,
})
export default class CountriesDB extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
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
    private code!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private image!: string;

    @HasMany(() => User)
    users!: User[];
}
