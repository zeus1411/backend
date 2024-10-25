import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';

import Website from '../websites.database';
import RoleDB from './role.database';
import CountriesDB from './country.database';
import WebsiteDB from '../websites.database';

@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: true,
})
export default class UserDB extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private fullname!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    private phone!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    private password!: string;

    @ForeignKey(() => CountriesDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    private country!: number;

    @ForeignKey(() => RoleDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    private role!: number;

    @ForeignKey(() => Website)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    private website!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    private balance!: number;

    @BelongsTo(() => CountriesDB)
    countryInfo!: CountriesDB;

    @BelongsTo(() => RoleDB)
    roleInfo!: RoleDB;

    @BelongsTo(() => WebsiteDB)
    websiteInfo!: Website;
}
