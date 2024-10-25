import { ICategory } from "@interfaces/models/products/category.model";
import { ICategoryService } from "@interfaces/services/products/category.service";
import { Category } from "@src/models/products/category.model";
import CategoryDB from "@src/services/database/products/category.database";
import { dateFormat } from "@src/utils/date-format";
import { plainToInstance } from "class-transformer";

export class CategoryService implements ICategoryService {
    async get(id: number): Promise<ICategory> {
        const category = await CategoryDB.findByPk(id);
        if (!category) throw new Error("Category not found");
        return plainToInstance(Category, dateFormat(category?.dataValues));
    }
    async getAll(): Promise<ICategory[]> {
        const categories = await CategoryDB.findAll();
        return categories.map(item => plainToInstance(Category, dateFormat(item?.dataValues)));
    }
    async create(item: ICategory): Promise<ICategory> {
        const category = await CategoryDB.create({ ...item });
        return await this.get(category.id);
    }
    async update(item: ICategory): Promise<ICategory> {
        const category = await CategoryDB.findByPk(item.id);
        if (!category) throw new Error("Category not found");

        category.set({ ...item });
        await category.save();

        return await this.get(category.id);
    }

    async delete(item: ICategory): Promise<boolean> {
        const category = await CategoryDB.findByPk(item.id);
        if (!category) throw new Error("Category not found");

        const query = await CategoryDB.destroy({
            where: { id: item.id }
        });
        return query > 0;
    }
}
