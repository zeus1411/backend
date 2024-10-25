import { IBrands } from "@interfaces/models/products/brands.model";
import { ICategory } from "@interfaces/models/products/category.model";
import { IChildCategory } from "@interfaces/models/products/child-category.model";
import { IProducts, ProductStatus } from "@interfaces/models/products/product.model";
import { ProductService } from '../../services/services/products/products.service';

export class Products implements IProducts {
    id: number;
    name: string;
    description: string;
    importPrice: number;
    price: number;
    category: ICategory;
    childCategory: IChildCategory;
    brand: IBrands;
    tags: string[];
    image: string;
    images: string[];
    status: ProductStatus;

    async setStatus(status: ProductStatus): Promise<void> {
        const productService = new ProductService();
        this.status = status;
        await productService.update(this);
    }
}


export class ProductBuilder {
    product: IProducts;

    private constructor() {
        this.product = new Products();
    }

    static new(): ProductBuilder {
        return new ProductBuilder();
    }

    setName(name: string): ProductBuilder {
        this.product.name = name;
        return this;
    }

    setDescription(description: string): ProductBuilder {
        this.product.description = description;
        return this;
    }

    setImportPrice(importPrice: number): ProductBuilder {
        this.product.importPrice = importPrice;
        return this;
    }

    setPrice(price: number): ProductBuilder {
        this.product.price = price;
        return this;
    }

    setChildCategory(childCategory: IChildCategory): ProductBuilder {
        this.product.childCategory = childCategory;
        this.product.category = childCategory.parent;
        return this;
    }

    setBrand(brand: IBrands): ProductBuilder {
        this.product.brand = brand;
        return this;
    }

    setTags(tags: string[]): ProductBuilder {
        this.product.tags = tags;
        return this;
    }

    setImage(image: string): ProductBuilder {
        this.product.image = image;
        return this;
    }

    setImages(images: string[]): ProductBuilder {
        this.product.images = images;
        return this;
    }

    setStatus(status: ProductStatus): ProductBuilder {
        this.product.status = status;
        return this;
    }

    build(): IProducts {
        return this.product;
    }
}






