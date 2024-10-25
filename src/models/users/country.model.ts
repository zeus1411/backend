import { IPictures } from "@interfaces/models/products/images.model";
import { ICountries } from "@interfaces/models/users/country.model";

export class Countries implements ICountries {
    id: number;
    name: string;
    code: string;
    image: string;
}

export class CountryBuilder {
    country: ICountries;

    private constructor() {
        this.country = new Countries();
    }

    static new() {
        return new CountryBuilder();
    }

    public setName(name: string) {
        this.country.name = name;
        return this;
    }

    public setCode(code: string) {
        this.country.code = code;
        return this;
    }

    public setImage(image: string) {
        this.country.image = image;
        return this;
    }

    public build() {
        return this.country;
    }
}