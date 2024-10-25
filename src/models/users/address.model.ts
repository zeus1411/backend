import { IAddress } from "@interfaces/models/users/address.model";
import { ICountries } from "@interfaces/models/users/country.model";
import { IUsers } from "@interfaces/models/users/users.model";

export class Address implements IAddress {
    id: number;
    user: IUsers;
    name: string;
    addresses: string;
    country: ICountries;
    phone: string;
    selected: boolean;
}

export class AddressBuilder {
    address: IAddress;

    private constructor() {
        this.address = new Address();
    }

    static new(): AddressBuilder {
        return new AddressBuilder();
    }

    setUser(user: IUsers): AddressBuilder {
        this.address.user = user;
        return this;
    }

    setName(name: string): AddressBuilder {
        this.address.name = name;
        return this;
    }

    setAddresses(addresses: string): AddressBuilder {
        this.address.addresses = addresses;
        return this;
    }

    setCountry(country: ICountries): AddressBuilder {
        this.address.country = country;
        return this;
    }

    setPhone(phone: string): AddressBuilder {
        this.address.phone = phone;
        return this;
    }

    setSelected(selected: boolean): AddressBuilder {
        this.address.selected = selected;
        return this;
    }

    build(): IAddress {
        return this.address;
    }
}