import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import User from './users.database';

@Table({
    tableName: 'role',
    timestamps: true,
    paranoid: true,
})
export default class RoleDB extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private title!: string;

    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    private permission!: string[];

    @HasMany(() => User)
    users!: User[];
}
