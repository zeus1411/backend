import { IAddress } from "@interfaces/models/users/address.model";
import { IUsers } from "@interfaces/models/users/users.model";
import { IAddressService } from "@interfaces/services/users/address.service";
import { Address } from "@src/models/users/address.model";
import { Countries } from "@src/models/users/country.model";
import { Users } from "@src/models/users/users.model";
import AddressesDB from "@src/services/database/users/address.database";
import CountriesDB from "@src/services/database/users/country.database";
import UserDB from "@src/services/database/users/users.database";
import { dateFormat } from "@src/utils/date-format";
import { plainToInstance } from "class-transformer";

export class AddressService implements IAddressService {
    include: any;

    constructor() {
        this.include = [
            { model: UserDB, as: 'userInfo' },
            { model: CountriesDB, as: 'countryInfo' }
        ]
    }

    async get(id: number): Promise<IAddress> {
        const address = await AddressesDB.findByPk(id, { include: this.include });
        if (!address) throw new Error("Address not found");
        return this.plainToAddress(address);
    }
    async getAll(): Promise<IAddress[]> {
        const address = await AddressesDB.findAll({ include: this.include });
        return address.map(item => this.plainToAddress(item));
    }

    async getAddressByUser(user: IUsers): Promise<IAddress[]> {
        const address = await AddressesDB.findAll({ where: { user: user.id }, include: this.include });
        return address.map(item => this.plainToAddress(item));
    }

    async getSelectedAddressByUser(user: IUsers): Promise<IAddress> {
        const address = await AddressesDB.findOne({ where: { user: user.id, selected: true }, include: this.include });
        if (!address) throw new Error("Address not found");
        return this.plainToAddress(address);
    }

    async create(item: IAddress): Promise<IAddress> {
        this.foreignChecking(item);

        const address = await AddressesDB.create({
            ...item,
            country: item.country.id,
            user: item.user.id
        });

        return await this.get(address.id);
    }
    async update(item: IAddress): Promise<IAddress> {
        this.foreignChecking(item);

        const address = await AddressesDB.findByPk(item.id, { include: this.include });
        if (!address) throw new Error("Address not found");
        address.set({ ...item, country: item.country.id, user: item.user.id });
        await address.save();

        return await this.get(address.id);
    }
    async delete(item: IAddress): Promise<boolean> {
        const address = await AddressesDB.findByPk(item.id);
        if (!address) throw new Error("Address not found");

        const query = await AddressesDB.destroy({
            where: { id: item.id }
        });
        return query > 0;
    }

    foreignChecking(item: IAddress): void {
        if (!item.country.id) throw new Error("Country not found");
        if (!item.user.id) throw new Error("User not found");
    }

    plainToAddress(item: AddressesDB): IAddress {
        const data = dateFormat(item?.dataValues);
        const address = plainToInstance(Address, data);
        address.country = plainToInstance(Countries, data.countryInfo?.dataValues);
        address.user = plainToInstance(Users, data.userInfo?.dataValues);
        return address;
    }
}