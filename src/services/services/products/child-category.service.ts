import { IChildCategoryService } from '@interfaces/services/products/child-category.service';
import { ChildCategory } from '../../../models/products/child-category.model';
import { IChildCategory } from '@interfaces/models/products/child-category.model';
import { plainToInstance } from 'class-transformer';
import ChildCategoryDB from '@src/services/database/products/child-category.database';
import CategoryDB from '@src/services/database/products/category.database';
import { Category } from '@src/models/products/category.model';
import { dateFormat } from '@src/utils/date-format';

export class ChildCategoryService implements IChildCategoryService {
    include: any;

    constructor() {
        this.include = [
            { model: CategoryDB, as: 'parentInfo' }
        ];
    }

    async get(id: number): Promise<IChildCategory> {
        const category = await ChildCategoryDB.findByPk(id, { include: this.include });
        if (!category) throw new Error("Category not found");
        return this.plainToChildCategory(category);
    }

    async getAll(): Promise<IChildCategory[]> {
        const categories = await ChildCategoryDB.findAll({ include: this.include });
        return categories.map(item => this.plainToChildCategory(item));
    }

    async create(item: IChildCategory): Promise<IChildCategory> {
        this.foreignChecking(item);

        const category = await ChildCategoryDB.create({
            ...item,
            category: item.parent.id
        });
        return await this.get(category.id);
    }
    async update(item: IChildCategory): Promise<IChildCategory> {
        this.foreignChecking(item);

        const category = await ChildCategoryDB.findByPk(item.id);
        if (!category) throw new Error("Category not found");
        category.set({
            ...item,
            category: item.parent.id
        });
        await category.save();
        return await this.get(category.id);
    }

    async delete(item: IChildCategory): Promise<boolean> {
        const category = await ChildCategoryDB.findByPk(item.id);
        if (!category) throw new Error("Category not found");
        const query = await ChildCategoryDB.destroy({
            where: { id: item.id }
        });
        return query > 0;
    }

    foreignChecking(item: IChildCategory): void {
        if (!item.parent) throw new Error("Category not found");
    }

    plainToChildCategory(item: ChildCategoryDB): IChildCategory {
        const data = dateFormat(item?.dataValues);
        const result = plainToInstance(ChildCategory, data);
        result.parent = plainToInstance(Category, data.parentInfo?.dataValues);
        return result;
    }

}