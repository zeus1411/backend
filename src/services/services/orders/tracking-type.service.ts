import { ITrackingType } from "@interfaces/models/orders/tracking-type.model";
import { ITrackingTypeService } from "@interfaces/services/orders/tracking-type.service";
import { TrackingType } from "@src/models/orders/tracking-type.model";
import TrackingTypeDB from "@src/services/database/orders/tracking-type.database";
import { plainToInstance } from "class-transformer";

export class TrackingTypeService implements ITrackingTypeService {
    async get(id: number): Promise<ITrackingType> {
        const type = await TrackingTypeDB.findByPk(id);
        if (!type) throw new Error("Tracking type not found");
        return plainToInstance(TrackingType, type.dataValues);
    }
    async getAll(): Promise<ITrackingType[]> {
        const types = await TrackingTypeDB.findAll();
        return types.map((type: TrackingTypeDB) => plainToInstance(TrackingType, type.dataValues));
    }
    async create(item: ITrackingType): Promise<ITrackingType> {
        const type = await TrackingTypeDB.create({ ...item });
        return this.get(type.id);
    }
    async update(item: ITrackingType): Promise<ITrackingType> {
        const type = await TrackingTypeDB.findByPk(item.id);
        if (!type) throw new Error("Tracking type not found");
        type.set(item);
        await type.save();
        return this.get(type.id);
    }
    async delete(item: ITrackingType): Promise<boolean> {
        const type = await TrackingTypeDB.findByPk(item.id);
        if (!type) throw new Error("Tracking type not found");

        const result = await TrackingTypeDB.destroy({ where: { id: item.id } });
        return result > 0;
    }
}