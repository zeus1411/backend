import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import TrackingDB from './tracking.database';

@Table({
    tableName: 'tracking_type',
    timestamps: true,
    paranoid: true,
})
export default class TrackingTypeDB extends Model {
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
    private code!: string;

    @HasMany(() => TrackingDB)
    tracking!: TrackingDB[];
}
