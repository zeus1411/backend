import { IUsers } from "@interfaces/models/users/users.model";
import { IUsersService } from "@interfaces/services/users/users.service";
import { Countries } from "@src/models/users/country.model";
import { Role } from "@src/models/users/role.model";
import { Users } from "@src/models/users/users.model";
import { Website } from "@src/models/website.model";
import CountriesDB from "@src/services/database/users/country.database";
import RoleDB from "@src/services/database/users/role.database";

import UserDB from "@src/services/database/users/users.database";
import WebsiteDB from "@src/services/database/websites.database";
import { dateFormat } from "@src/utils/date-format";
import { plainToInstance } from "class-transformer";

export class UsersService implements IUsersService {
    include: any;

    constructor() {
        this.include = [
            { model: RoleDB, as: 'roleInfo' },
            { model: CountriesDB, as: 'countryInfo' },
            { model: WebsiteDB, as: 'websiteInfo' }
        ]
    }

    async get(id: number): Promise<IUsers> {
        const users = await UserDB.findByPk(id, { include: this.include });
        if (!users) throw new Error("User not found");
        return this.plainToUsers(users);
    }
    async getAll(): Promise<IUsers[]> {
        const users = await UserDB.findAll({ include: this.include });
        return users.map(item => this.plainToUsers(item));
    }
    async create(item: IUsers): Promise<IUsers> {
        this.foreignChecking(item);

        const users = await UserDB.create({
            ...item,
            role: item.role.id,
            country: item.country.id,
            website: item.website.id,
        });
        return await this.get(users.id);
    }

    async update(item: IUsers): Promise<IUsers> {
        this.foreignChecking(item);

        const users = await UserDB.findByPk(item.id, { include: this.include });
        if (!users) throw new Error("User not found");

        users.set({
            ...item,
            role: item.role.id,
            country: item.country.id,
            website: item.website.id,
        });
        await users.save();

        return await this.get(users.id);
    }

    async delete(item: IUsers): Promise<boolean> {
        const user = await UserDB.findByPk(item.id);
        if (!user) throw new Error("User not found");

        const query = await UserDB.destroy({
            where: { id: item.id }
        });
        return query > 0;
    }

    foreignChecking(item: IUsers): void {
        if (!item.country.id) throw new Error("Country not found");
        if (!item.website.id) throw new Error("Website not found");
        if (!item.role.id) throw new Error("Role not found");
    }

    plainToUsers(item: UserDB): IUsers {
        const data = dateFormat(item?.dataValues)
        const user = plainToInstance(Users, data);
        user.country = plainToInstance(Countries, data.countryInfo?.dataValues);
        user.role = plainToInstance(Role, data.roleInfo?.dataValues);
        user.website = plainToInstance(Website, data.websiteInfo?.dataValues);
        return user;
    }

}