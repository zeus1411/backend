import { ICategory } from "@interfaces/models/products/category.model";

export class Category implements ICategory {
    id: number;
    name: string;
    image: string;
}

export class CategoryBuilder {
    category: Category;

    private constructor() {
        this.category = new Category();
    }

    static new() {
        return new CategoryBuilder();
    }

    setName(name: string) {
        this.category.name = name;
        return this;
    }

    setImage(image: string) {
        this.category.image = image;
        return this;
    }

    build(): ICategory {
        return this.category;
    }
}










