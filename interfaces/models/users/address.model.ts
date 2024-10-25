import { ICountries } from "./country.model";
import { IUsers } from "./users.model";

/**
 * 
 * Interface: IAddress
 * 
 */

export interface IAddress {
    id: number;
    user: IUsers;
    name: string;
    addresses: string;
    country: ICountries;
    phone: string;
    selected: boolean;
}
