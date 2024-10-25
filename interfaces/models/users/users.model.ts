import { IWebsites } from "../website.model";
import { IAddress } from "./address.model";
import { ICountries } from "./country.model";
import { IRole } from "./role.model";

/**
 * 
 * Interface: IUsers
 * 
 */

export interface IUsers {
    id: number;
    fullname: string;
    phone: string;
    password: string;
    balance: number;
    country: ICountries;
    role: IRole;
    website: IWebsites;

    /**
     * Cập nhật role cho tài khoản 
     * 
     * @param role 
     */
    setRole(role: IRole): Promise<void>;

    /**
     * Đặt địa chỉ mặc định cho người dùng
     * 
     * @param address Địa chỉ muốn đặt
     */
    setDefaultAddress(address: IAddress): Promise<void>;
}