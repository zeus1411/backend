import { ITrackings } from "@interfaces/models/orders/trackings.model";
import { ITrackingsService } from "@interfaces/services/orders/trackings.service";
import { Orders } from "@src/models/orders/orders.model";
import { TrackingType } from "@src/models/orders/tracking-type.model";
import { Tracking } from "@src/models/orders/trackings.model";
import OrdersDB from "@src/services/database/orders/orders.database";
import TrackingTypeDB from "@src/services/database/orders/tracking-type.database";
import TrackingDB from "@src/services/database/orders/tracking.database";
import { plainToInstance } from "class-transformer";

export class TrackingService implements ITrackingsService {
    include: any;

    constructor() {
        this.include = [
            { model: OrdersDB, as: 'orderInfo' },
            { model: TrackingTypeDB, as: 'typeInfo' }
        ]
    }

    async get(id: number): Promise<ITrackings> {
        const tracking = await TrackingDB.findByPk(id, { include: this.include });
        if (!tracking) throw new Error("Tracking not found");
        return this.plainToTracking(tracking);
    }
    async getAll(): Promise<ITrackings[]> {
        const trackings = await TrackingDB.findAll({ include: this.include });
        return trackings.map((tracking: TrackingDB) => this.plainToTracking(tracking));
    }
    async create(item: ITrackings): Promise<ITrackings> {
        this.foreignChecking(item);
        const tracking = await TrackingDB.create({
            ...item,
            order: item.order.id,
            type: item.type.id ?? undefined
        });
        return this.get(tracking.id);
    }
    async update(item: ITrackings): Promise<ITrackings> {
        this.foreignChecking(item);

        const tracking = await TrackingDB.findByPk(item.id, { include: this.include });
        if (!tracking) throw new Error("Tracking not found");

        tracking.set({
            ...item,
            order: item.order.id,
            type: item.type.id ?? undefined
        });
        await tracking.save();

        return this.get(tracking.id);
    }
    async delete(item: ITrackings): Promise<boolean> {
        const tracking = await TrackingDB.findByPk(item.id, { include: this.include });
        if (!tracking) throw new Error("Tracking not found");

        const result = await TrackingDB.destroy({ where: { id: item.id } });
        return result > 0;
    }

    foreignChecking(item: ITrackings) {
        if (!item.order) throw new Error("Order not found");
    }

    plainToTracking(tracking: TrackingDB): ITrackings {
        const data = tracking.dataValues;

        const result = plainToInstance(Tracking, data)
        result.order = plainToInstance(Orders, data.orderInfo?.dataValues);
        result.type = plainToInstance(TrackingType, data.typeInfo?.dataValues);

        return result;
    }
}