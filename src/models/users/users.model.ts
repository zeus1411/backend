import { IAddress } from "@interfaces/models/users/address.model";
import { UsersService } from "@src/services/services/users/users.service";
import { ICountries } from "interfaces/models/users/country.model";
import { IRole } from "interfaces/models/users/role.model";
import { IUsers } from "interfaces/models/users/users.model";
import { IWebsites } from "interfaces/models/website.model";
import { AddressService } from '../../services/services/users/address.service';

export class Users implements IUsers {
    id: number;
    fullname: string;
    phone: string;
    password: string;
    country: ICountries;
    balance: number;
    role: IRole;
    website: IWebsites;

    // Todo: DEMO CODE
    async setRole(role: IRole): Promise<void> {
        const usersService = new UsersService();
        this.role = role;
        await usersService.update(this);
    }

    async setDefaultAddress(address: IAddress): Promise<void> {
        const addressService = new AddressService();

        const checking = await addressService.get(address.id);
        if (!checking) throw new Error("Address not found");

        const addressList = await addressService.getAddressByUser(this);

        if (addressList.length > 0) {
            await Promise.all(addressList.map(async (add) => {
                add.selected = (add.id === address.id) ? true : false;
                await addressService.update(add);
            }));
        }
    }
}

export class UserBuilder {
    user: IUsers;

    private constructor() {
        this.user = new Users();
    }

    public setFullname(fullname: string) {
        this.user.fullname = fullname;
        return this;
    }

    public setPhone(phone: string) {
        this.user.phone = phone;
        return this;
    }

    public setPassword(password: string) {
        this.user.password = password;
        return this;
    }

    public setCountry(country: ICountries) {
        this.user.country = country;
        return this;
    }

    public setRole(role: IRole) {
        this.user.role = role;
        return this;
    }

    public setBalance(balance: number) {
        this.user.balance = balance;
        return this;
    }

    public setWebsite(website: IWebsites) {
        this.user.website = website;
        return this;
    }

    static new() { return new UserBuilder(); }
    public build() { return this.user }

}
