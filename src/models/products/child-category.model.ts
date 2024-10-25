import { ICategory } from "@interfaces/models/products/category.model";
import { IChildCategory } from "@interfaces/models/products/child-category.model";
import { CategoryService } from '../../services/services/products/category.service';
import { ChildCategoryService } from '../../services/services/products/child-category.service';
import { ProductService } from '../../services/services/products/products.service';

export class ChildCategory implements IChildCategory {
    id: number;
    name: string;
    image: string;
    parent: ICategory;

    async changeParent(parent: ICategory): Promise<void> {
        const categoryService = new CategoryService();
        const childCategoryService = new ChildCategoryService();
        const productService = new ProductService();

        const products = await productService.getProductByChildCategory(this);

        const category = await categoryService.get(parent.id);
        if (!category) throw new Error("Category not found");
        this.parent = category;
        await childCategoryService.update(this);

        if (products.length > 0) {
            await Promise.all(products.map(async (product) => {
                product.category = category;
                await productService.update(product);
            }));
        }
    }
}

export class ChildCategoryBuilder {
    childCategory: ChildCategory;

    private constructor() {
        this.childCategory = new ChildCategory();
    }

    static new() {
        return new ChildCategoryBuilder();
    }

    setName(name: string) {
        this.childCategory.name = name;
        return this;
    }

    setImage(image: string) {
        this.childCategory.image = image;
        return this;
    }

    setParent(parent: ICategory) {
        this.childCategory.parent = parent;
        return this;
    }

    build(): IChildCategory {
        return this.childCategory;
    }
}