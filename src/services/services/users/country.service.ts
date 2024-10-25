import { ICountries } from "@interfaces/models/users/country.model";
import { ICountriesService } from "@interfaces/services/users/country.service";
import { Countries } from "@src/models/users/country.model";
import CountriesDB from "@src/services/database/users/country.database";
import { dateFormat } from "@src/utils/date-format";
import { plainToInstance } from "class-transformer";


export class CountriesService implements ICountriesService {
    async get(id: number): Promise<ICountries> {
        const countries = await CountriesDB.findByPk(id);
        if (!countries) throw new Error("Country not found");
        return plainToInstance(Countries, dateFormat(countries?.dataValues));
    }
    async getAll(): Promise<ICountries[]> {
        const countries = await CountriesDB.findAll();
        return countries.map(item => plainToInstance(Countries, dateFormat(item?.dataValues)));
    }
    async create(item: ICountries): Promise<ICountries> {
        const countries = await CountriesDB.create({ ...item });
        return await this.get(countries.id);
    }
    async update(item: ICountries): Promise<ICountries> {
        const countries = await CountriesDB.findByPk(item.id);
        if (!countries) throw new Error("Country not found");

        countries.set({ ...item });
        await countries.save();

        return await this.get(countries.id);
    }

    async delete(item: ICountries): Promise<boolean> {
        const countries = await CountriesDB.findByPk(item.id);
        if (!countries) throw new Error("Country not found");

        const query = await CountriesDB.destroy({
            where: { id: item.id }
        });
        return query > 0;
    }
}