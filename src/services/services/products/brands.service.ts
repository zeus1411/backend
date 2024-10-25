import { IBrands } from "@interfaces/models/products/brands.model";
import { Brands } from "@src/models/products/brands.model";
import { IBrandsService } from "@interfaces/services/products/brands.service";
import BrandsDB from "@src/services/database/products/brands.database";
import { plainToInstance } from "class-transformer";
import { dateFormat } from "@src/utils/date-format";

export class BrandsService implements IBrandsService {
    async get(id: number): Promise<IBrands> {
        const brands = await BrandsDB.findByPk(id);
        if (!brands) throw new Error("Brands not found");
        return plainToInstance(Brands, dateFormat(brands?.dataValues));
    }

    async getAll(): Promise<IBrands[]> {
        const brands = await BrandsDB.findAll();
        return brands.map(item => plainToInstance(Brands, dateFormat(item?.dataValues)));
    }

    async create(item: IBrands): Promise<IBrands> {
        const brands = await BrandsDB.create({ ...item });
        return await this.get(brands.id);
    }

    async update(item: IBrands): Promise<IBrands> {
        const brand = await BrandsDB.findByPk(item.id);
        if (!brand) throw new Error("Brands not found");

        brand.set({ ...item });
        await brand.save();

        return await this.get(brand.id);
    }

    async delete(item: IBrands): Promise<boolean> {
        const brand = await BrandsDB.findByPk(item.id);
        if (!brand) throw new Error("Brands not found");

        const query = await BrandsDB.destroy({
            where: { id: item.id }
        });
        return query > 0;
    }

}