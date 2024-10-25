import { ICategory } from "@interfaces/models/products/category.model";
import { IProducts } from "@interfaces/models/products/product.model";
import { IProductsService } from "@interfaces/services/products/product.service";
import { Brands } from "@src/models/products/brands.model";
import { Category } from "@src/models/products/category.model";
import { ChildCategory } from "@src/models/products/child-category.model";
import { Products } from "@src/models/products/product.model";
import BrandsDB from "@src/services/database/products/brands.database";
import CategoryDB from "@src/services/database/products/category.database";
import ChildCategoryDB from "@src/services/database/products/child-category.database";
import ProductsDB from "@src/services/database/products/product.database";
import { dateFormat } from "@src/utils/date-format";
import { plainToInstance } from "class-transformer";

export class ProductService implements IProductsService {
    include: any;

    constructor() {
        this.include = [
            { model: BrandsDB, as: 'brandInfo' },
            { model: CategoryDB, as: 'categoryInfo' },
            { model: ChildCategoryDB, as: 'childCategoryInfo' }
        ]
    }

    async get(id: number): Promise<IProducts> {
        const product = await ProductsDB.findByPk(id, { include: this.include });
        if (!product) throw new Error("Product not found");
        return this.plainToProducts(product);
    }

    async getAll(): Promise<IProducts[]> {
        const products = await ProductsDB.findAll({ include: this.include });
        return products.map(item => this.plainToProducts(item));
    }

    async getProductByCategory(category: ICategory): Promise<IProducts[]> {
        const products = await ProductsDB.findAll({ where: { category: category.id }, include: this.include });
        return products.map(item => this.plainToProducts(item));
    }
    async getProductByChildCategory(childCategory: ICategory): Promise<IProducts[]> {
        const products = await ProductsDB.findAll({ where: { childCategory: childCategory.id }, include: this.include });
        return products.map(item => this.plainToProducts(item));
    }

    async create(item: IProducts): Promise<IProducts> {
        this.foreignChecking(item);
        const product = await ProductsDB.create({
            ...item,
            brand: item.brand.id,
            category: item.category.id,
            childCategory: item.childCategory.id
        });
        return await this.get(product.id);
    }

    async update(item: IProducts): Promise<IProducts> {
        this.foreignChecking(item);

        const product = await ProductsDB.findByPk(item.id, { include: this.include });
        if (!product) throw new Error("Product not found");
        product.set({
            ...item,
            brand: item.brand.id,
            category: item.category.id,
            childCategory: item.childCategory.id
        });
        await product.save();
        return await this.get(product.id);
    }

    async delete(item: IProducts): Promise<boolean> {
        const product = await ProductsDB.findByPk(item.id, { include: this.include });
        if (!product) throw new Error("Product not found");

        const query = await ProductsDB.destroy({ where: { id: item.id } });
        return query > 0;
    }

    foreignChecking(item: IProducts): void {
        if (!item.brand.id) throw new Error("Brand not found");
        if (!item.category.id) throw new Error("Category not found");
        if (!item.childCategory.id) throw new Error("Child Category not found");
    }

    plainToProducts(item: ProductsDB): IProducts {
        const data = dateFormat(item?.dataValues);
        const product = plainToInstance(Products, data);
        product.brand = plainToInstance(Brands, data.brandInfo?.dataValues);
        product.category = plainToInstance(Category, data.categoryInfo?.dataValues);
        product.childCategory = plainToInstance(ChildCategory, data.childCategoryInfo?.dataValues);
        return product;
    }
}