import { IBrands } from "@interfaces/models/products/brands.model";

export class Brands implements IBrands {
    id: number;
    name: string;
    image: string;

}

export class BrandsBuilder {
    brands: Brands;

    private constructor() {
        this.brands = new Brands();
    }

    static new() {
        return new BrandsBuilder();
    }

    setName(name: string) {
        this.brands.name = name;
        return this;
    }

    setImage(image: string) {
        this.brands.image = image;
        return this;
    }

    build(): IBrands {
        return this.brands;
    }
}