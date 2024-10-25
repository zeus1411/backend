import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import User from './users/users.database';

@Table({
    tableName: 'website',
    timestamps: true,
    paranoid: true,
})
export default class WebsiteDB extends Model {
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
        type: DataType.STRING,
        allowNull: false,
    })
    private domain!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private cdn!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private logo!: string;

    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    private settings!: any[];

    @HasMany(() => User)
    users!: User[];
}
